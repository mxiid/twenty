import { RowDataPacket } from 'mysql2';
import { createConnection } from 'mysql2/promise';
import { rawDataSource } from 'src/database/typeorm/raw/raw.datasource';

interface OpportunityDetails extends RowDataPacket {
  'Membership Number': string;
  'Area Pledged': number;
  'Pledge Amount': number;
  'Property Name': string;
  'Pledge Date': Date;
  'Internal Status': string;
}

const WORKSPACE_SCHEMA = 'workspace_3ixj3i1a5avy16ptijtb3lae3';

async function migrateOpportunities() {
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
    const [opportunities] = await mysqlConnection.query<OpportunityDetails[]>(`
      SELECT 
        u.membershipNumber AS \`Membership Number\`,
        ta.areaPledged AS \`Area Pledged\`,
        ta.totalPrice AS \`Pledge Amount\`,
        p.name AS \`Property Name\`,
        ta.createdAt AS \`Pledge Date\`,
        ta.internalStatus AS \`Internal Status\`
      FROM tradeactivity ta
      JOIN signup_tagged u ON ta.buyerID = u.id
      LEFT JOIN property p ON ta.propertyID = p.id
      WHERE u.membershipNumber IS NOT NULL AND ta.internalStatus != 'discard'
      ORDER BY ta.createdAt ASC;
    `);

    console.log(`Found ${opportunities.length} opportunities to migrate`);

    for (const opportunity of opportunities) {
      try {
        // Parse numeric values and convert to micros
        const areaPledged = parseFloat(opportunity['Area Pledged']?.toString() || '0');
        const pledgeAmount = parseFloat(opportunity['Pledge Amount']?.toString() || '0');
        const pledgeAmountMicros = Math.round(pledgeAmount * 1000000).toString();
        
        // Generate opportunity name
        const opportunityName = `${areaPledged} sqft @ ${opportunity['Property Name']}`;

        // Get the person's UUID based on membershipNumber
        console.log('Searching for membershipNumber:', opportunity['Membership Number']);
        const personResult = await rawDataSource.query(`
          SELECT id 
          FROM ${WORKSPACE_SCHEMA}.person 
          WHERE "membershipNumber" = $1
          LIMIT 1
        `, [opportunity['Membership Number']]);

        console.log('Query result:', personResult);

        if (!personResult || personResult.length === 0) {
          console.error(`No person found for membership number: ${opportunity['Membership Number']}`);
          continue;
        }

        const personId = personResult[0].id;

        // Log the status value we're trying to insert
        console.log('Status value:', opportunity['Internal Status'].toUpperCase());

        await rawDataSource.query(`
          INSERT INTO ${WORKSPACE_SCHEMA}.opportunity 
          (
            "name",
            "stage",
            "pledgedArea",
            "projectPledged",
            "membershipNumber",
            "pledgeStatus",
            "createdAt",
            "updatedAt",
            "pointOfContactId",
            "pledgedAmountAmountMicros",
            "createdBySource"
          )
          VALUES (
            $1,
            'NEW'::${WORKSPACE_SCHEMA}.opportunity_stage_enum,
            CAST($2 AS double precision),
            $3,
            $4,
            $5::"${WORKSPACE_SCHEMA}"."opportunity_pledgeStatus_enum",
            $6,
            $6,
            $7,
            CAST($8 AS numeric),
            'MANUAL'::"${WORKSPACE_SCHEMA}"."opportunity_createdBySource_enum"
          )
        `, [
          opportunityName,
          areaPledged,
          opportunity['Property Name'] || '',
          opportunity['Membership Number'],
          opportunity['Internal Status'].toUpperCase(),
          opportunity['Pledge Date'],
          personId,
          pledgeAmountMicros
        ]);
        
        console.log(`Created opportunity: ${opportunityName} with point of contact: ${personId}`);
      } catch (error) {
        console.error(
          `Failed to migrate opportunity for member ${opportunity['Membership Number']}:`,
          error
        );
        continue;
      }
    }

    console.log('Opportunities migrated successfully');
  } catch (error) {
    console.error('Failed to migrate opportunities:', error);
    throw error;
  } finally {
    await mysqlConnection.end();
    await rawDataSource.destroy();
  }
}

// Run migration
migrateOpportunities()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  }); 