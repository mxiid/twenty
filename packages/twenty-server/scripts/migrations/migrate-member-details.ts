// scripts/migrations/migrate-member-details.ts
import { RowDataPacket } from 'mysql2';
import { createConnection } from 'mysql2/promise';
import { rawDataSource } from 'src/database/typeorm/raw/raw.datasource';

interface MemberDetails extends RowDataPacket {
  'Membership Number': string;
  'Total Area Pledged': number;
  'Total Pledge Amount': number;
  'Total Invested Amount': number;
  'Property Names': string;
  'Pledge Date': Date;
  'Total Pledge Count': number;
  'Total Activity Count': number;
  'Last Activity Date': Date;
  '7-Day Activity Count': number;
  '30-Day Activity Count': number;
  'Email Verified': number;
  'Phone Verified': number;
  'Wallet Balance': number;
  'Latest Activity Performed': string;
  'User Tag': string;
}

const WORKSPACE_SCHEMA = 'workspace_3ixj3i1a5avy16ptijtb3lae3';

async function migrateMemberDetails() {
  const mysqlConnection = await createConnection({
    host: 'dao-production-database-v2.cih83lmrvcy3.ap-southeast-1.rds.amazonaws.com',
    user: 'muid',
    password: 'muiddb_123',
    database: 'daoproptechdatabasev2',
    port: 3306,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await rawDataSource.initialize();

  try {
    const [members] = await mysqlConnection.query<MemberDetails[]>(`
      WITH UserActivityAgg AS (
        SELECT 
          causerID,
          COUNT(*) AS totalActivityCount,
          MAX(createdAt) AS lastActivityDate,
          COUNT(CASE WHEN createdAt >= NOW() - INTERVAL 7 DAY THEN 1 END) AS last7DayActivityCount,
          COUNT(CASE WHEN createdAt >= NOW() - INTERVAL 30 DAY THEN 1 END) AS last30DayActivityCount
        FROM activityLogs
        WHERE causerID IS NOT NULL
        GROUP BY causerID
      ),
      LatestActivity AS (
        SELECT causerID, description
        FROM (
          SELECT 
            causerID,
            description,
            ROW_NUMBER() OVER (PARTITION BY causerID ORDER BY createdAt DESC) AS rn
          FROM activityLogs
          WHERE causerID IS NOT NULL
        ) t
        WHERE rn = 1
      ),
      TradeActivityAgg AS (
        SELECT 
          ta.buyerID,
          SUM(ta.areaPledged) AS TotalAreaPledged,
          SUM(ta.totalPrice) AS TotalPledgeAmount,
          COUNT(ta.id) AS TotalPledgeCount,
          SUM(CASE WHEN ta.internalStatus = 'locked' THEN ta.totalPrice ELSE 0 END) AS TotalInvestedAmount,
          MIN(ta.createdAt) AS PledgeDate,
          GROUP_CONCAT(DISTINCT p.name) AS PropertyNames,
          MAX(ta.internalStatus) AS PaymentStatus
        FROM tradeactivity ta
        LEFT JOIN property p ON ta.propertyID = p.id
        GROUP BY ta.buyerID
      )
      SELECT 
        u.membershipNumber AS \`Membership Number\`,
        COALESCE(taAgg.TotalAreaPledged, 0) AS \`Total Area Pledged\`,
        COALESCE(taAgg.TotalPledgeAmount, 0) AS \`Total Pledge Amount\`,
        COALESCE(taAgg.TotalInvestedAmount, 0) AS \`Total Invested Amount\`,
        taAgg.PropertyNames AS \`Property Names\`,
        taAgg.PledgeDate AS \`Pledge Date\`,
        COALESCE(taAgg.TotalPledgeCount, 0) AS \`Total Pledge Count\`,
        COALESCE(ua.totalActivityCount, 0) AS \`Total Activity Count\`,
        ua.lastActivityDate AS \`Last Activity Date\`,
        COALESCE(ua.last7DayActivityCount, 0) AS \`7-Day Activity Count\`,
        COALESCE(ua.last30DayActivityCount, 0) AS \`30-Day Activity Count\`,
        u.is_email_verified AS \`Email Verified\`,
        u.is_phonenumber_verified AS \`Phone Verified\`,
        COALESCE(pb.balance, 0) AS \`Wallet Balance\`,
        la.description AS \`Latest Activity Performed\`,
        u.userTag AS \`User Tag\`
      FROM signup_tagged u
      LEFT JOIN TradeActivityAgg taAgg ON u.id = taAgg.buyerID
      LEFT JOIN UserActivityAgg ua ON u.id = ua.causerID
      LEFT JOIN LatestActivity la ON u.id = la.causerID
      LEFT JOIN portfoliobalance pb ON u.id = pb.userID
      WHERE u.membershipNumber IS NOT NULL
      ORDER BY COALESCE(taAgg.PledgeDate, u.createdAt) ASC, u.id;
    `);

    console.log(`Found ${members.length} members to migrate`);

    for (const member of members) {
      try {
        // Parse all numeric values first
        const areaPledged = parseFloat(member['Total Area Pledged']?.toString() || '0');
        const pledgeAmount = parseFloat(member['Total Pledge Amount']?.toString() || '0');
        const walletBalance = Number(member['Wallet Balance'] || 0).toFixed(2); // Just keep 2 decimal places
        
        await rawDataSource.query(`
          UPDATE ${WORKSPACE_SCHEMA}.person 
          SET 
            "latestAreaPledged" = CAST($1 AS numeric),
            "latestPledgeAmountAmountMicros" = CAST(ROUND($2 * 1000000) AS numeric),
            "latestPledgedProject" = $3,
            "latestPledgeDate" = $4,
            "totalActivityCount" = CAST($5 AS integer),
            "latestActivityDate" = $6,
            "last7DayActivityCount" = CAST($7 AS integer),
            "last30DayActivityCount" = CAST($8 AS integer),
            "emailVerified" = $9::boolean,
            "phoneVerified" = $10::boolean,
            "walletBalance" = CAST($11 AS numeric)
          WHERE "membershipNumber" = $12
        `, [
          areaPledged,
          pledgeAmount,
          member['Property Names'] || '',
          member['Pledge Date'],
          member['Total Activity Count'] || 0,
          member['Last Activity Date'],
          member['7-Day Activity Count'] || 0,
          member['30-Day Activity Count'] || 0,
          !!member['Email Verified'],
          !!member['Phone Verified'],
          walletBalance,  // Direct numeric value with 2 decimal places
          member['Membership Number']
        ]);
        console.log(`Updated details for member: ${member['Membership Number']}`);
      } catch (error) {
        console.error(
          `Failed to migrate member ${member['Membership Number']}:`,
          error
        );
        continue;
      }
    }

    console.log('Member details migrated successfully');
  } catch (error) {
    console.error('Failed to migrate member details:', error);
    throw error;
  } finally {
    await mysqlConnection.end();
    await rawDataSource.destroy();
  }
}

// Run migration
migrateMemberDetails()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });