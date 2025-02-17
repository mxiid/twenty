import { rawDataSource } from 'src/database/typeorm/raw/raw.datasource';

const WORKSPACE_ID = '3b8e6458-5fc1-4e63-8563-008ccddaa6db';
const WORKSPACE_SCHEMA = 'workspace_3ixj3i1a5avy16ptijtb3lae3';

// Add type definitions at the top
type ColumnDefinition = {
  name: string;
  columnType: string;
  defaultValue: string | null;
  isNullable: boolean;
};

type CustomField = {
  name: string;
  label: string;
  type: string;
  columnType?: string;
  defaultValue?: string | null;
  isNullable: boolean;
  description: string;
  isUnique?: boolean;
  columns?: ColumnDefinition[];
};

// For membershipNumber field, we need to handle it separately
const createMembershipNumberField = async (personObject: any) => {
  // First create the column without constraints
  await rawDataSource.query(`
    ALTER TABLE ${WORKSPACE_SCHEMA}.person
    ADD COLUMN IF NOT EXISTS "membershipNumber" text;
  `);

  // Update any NULL values to empty string
  await rawDataSource.query(`
    UPDATE ${WORKSPACE_SCHEMA}.person
    SET "membershipNumber" = ''
    WHERE "membershipNumber" IS NULL;
  `);

  // Now add NOT NULL constraint
  await rawDataSource.query(`
    ALTER TABLE ${WORKSPACE_SCHEMA}.person
    ALTER COLUMN "membershipNumber" SET NOT NULL;
  `);

  // Add unique constraint excluding empty strings
  await rawDataSource.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS "person_membershipnumber_unique"
    ON ${WORKSPACE_SCHEMA}.person ("membershipNumber")
    WHERE "membershipNumber" != '';
  `);

  // Add metadata
  await rawDataSource.query(
    `INSERT INTO metadata."fieldMetadata" 
     (type, name, label, "objectMetadataId", "workspaceId", "isCustom", "isActive", "isSystem", "isNullable", "description", "defaultValue", "isUnique")
     VALUES ($1, $2, $3, $4, $5, true, true, false, false, $6, $7, true)
     ON CONFLICT ("workspaceId", "objectMetadataId", name) DO UPDATE SET
       type = EXCLUDED.type,
       label = EXCLUDED.label,
       "isNullable" = EXCLUDED."isNullable",
       description = EXCLUDED.description,
       "defaultValue" = EXCLUDED."defaultValue",
       "isUnique" = EXCLUDED."isUnique",
       "updatedAt" = NOW()`,
    [
      'TEXT',
      'membershipNumber',
      'Membership Number',
      personObject.id,
      WORKSPACE_ID,
      'Unique membership identifier',
      JSON.stringify({ value: '' })
    ]
  );
};

async function createMemberDetailFields() {
  await rawDataSource.initialize();
  
  try {
    const [personObject] = await rawDataSource.query(`
      SELECT id FROM metadata."objectMetadata" 
      WHERE "nameSingular" = 'person' 
      AND "workspaceId" = $1
    `, [WORKSPACE_ID]);

    if (!personObject) {
      throw new Error('Person object metadata not found');
    }

    // First handle membershipNumber separately
    await createMembershipNumberField(personObject);

    // Then handle other fields
    const customFields: CustomField[] = [
      { 
        name: 'latestAreaPledged',
        label: 'Latest Area Pledged',
        type: 'NUMBER',
        columnType: 'double precision',
        defaultValue: '0',
        isNullable: false,
        description: 'Latest pledged area in square feet',
        isUnique: false
      },
      { 
        name: 'latestPledgeAmount',
        label: 'Latest Pledge Amount',
        type: 'CURRENCY',
        isNullable: true,
        description: 'Latest pledge amount',
        isUnique: false,
        columns: [
          { name: 'latestPledgeAmountAmountMicros', columnType: 'numeric', defaultValue: null, isNullable: true },
          { name: 'latestPledgeAmountCurrencyCode', columnType: 'text', defaultValue: '\'PKR\'::text', isNullable: true }
        ]
      },
      {
        name: 'latestPropertyName',
        label: 'Latest Property',
        type: 'TEXT',
        columnType: 'text',
        defaultValue: '\'\'::text',
        isNullable: false,
        description: 'Name of the latest pledged property'
      },
      {
        name: 'latestPledgeDate',
        label: 'Latest Pledge Date',
        type: 'DATE_TIME',
        columnType: 'timestamp with time zone',
        defaultValue: null,
        isNullable: true,
        description: 'Date of the latest pledge'
      },
      {
        name: 'totalPledgesCount',
        label: 'Total Pledges',
        type: 'NUMBER',
        columnType: 'integer',
        defaultValue: '0',
        isNullable: false,
        description: 'Total number of pledges'
      },
      {
        name: 'totalPledgedAmount',
        label: 'Total Pledged Amount',
        type: 'CURRENCY',
        isNullable: true,
        description: 'Total amount pledged',
        columns: [
          { name: 'totalPledgedAmountAmountMicros', columnType: 'numeric', defaultValue: null, isNullable: true },
          { name: 'totalPledgedAmountCurrencyCode', columnType: 'text', defaultValue: '\'PKR\'::text', isNullable: true }
        ]
      },
      {
        name: 'totalAreaPledged',
        label: 'Total Area Pledged',
        type: 'NUMBER',
        columnType: 'double precision',
        defaultValue: '0',
        isNullable: false,
        description: 'Total area pledged in square feet'
      },
      {
        name: 'walletBalance',
        label: 'Wallet Balance',
        type: 'CURRENCY',
        isNullable: true,
        description: 'Current wallet balance',
        columns: [
          { name: 'walletBalanceAmountMicros', columnType: 'numeric', defaultValue: null, isNullable: true },
          { name: 'walletBalanceCurrencyCode', columnType: 'text', defaultValue: '\'PKR\'::text', isNullable: true }
        ]
      },
      {
        name: 'totalActivityCount',
        label: 'Total Activity',
        type: 'NUMBER',
        columnType: 'integer',
        defaultValue: '0',
        isNullable: false,
        description: 'Total number of activities'
      },
      {
        name: 'lastActivityDate',
        label: 'Last Activity Date',
        type: 'DATE_TIME',
        columnType: 'timestamp with time zone',
        defaultValue: null,
        isNullable: true,
        description: 'Date of last activity'
      },
      {
        name: 'last7DayActivityCount',
        label: '7-Day Activity Count',
        type: 'NUMBER',
        columnType: 'integer',
        defaultValue: '0',
        isNullable: false,
        description: 'Activity count in last 7 days'
      },
      {
        name: 'last30DayActivityCount',
        label: '30-Day Activity Count',
        type: 'NUMBER',
        columnType: 'integer',
        defaultValue: '0',
        isNullable: false,
        description: 'Activity count in last 30 days'
      },
      {
        name: 'isEmailVerified',
        label: 'Email Verified',
        type: 'BOOLEAN',
        columnType: 'boolean',
        defaultValue: 'false',
        isNullable: false,
        description: 'Email verification status'
      },
      {
        name: 'isPhoneVerified',
        label: 'Phone Verified',
        type: 'BOOLEAN',
        columnType: 'boolean',
        defaultValue: 'false',
        isNullable: false,
        description: 'Phone verification status'
      },
      {
        name: 'userTag',
        label: 'User Tag',
        type: 'TEXT',
        columnType: 'text',
        defaultValue: '\'\'::text',
        isNullable: false,
        description: 'User tag'
      }
    ];

    // Create fields
    for (const field of customFields) {
      try {
        // Create field metadata with corrected ON CONFLICT clause
        const [createdField] = await rawDataSource.query(
          `INSERT INTO metadata."fieldMetadata" 
           (type, name, label, "objectMetadataId", "workspaceId", "isCustom", "isActive", "isSystem", "isNullable", "description", "defaultValue", "isUnique")
           VALUES ($1, $2, $3, $4, $5, true, true, false, $6, $7, $8, $9)
           ON CONFLICT ("workspaceId", "objectMetadataId", name) DO UPDATE SET
             type = EXCLUDED.type,
             label = EXCLUDED.label,
             "isNullable" = EXCLUDED."isNullable",
             description = EXCLUDED.description,
             "defaultValue" = EXCLUDED."defaultValue",
             "isUnique" = EXCLUDED."isUnique",
             "updatedAt" = NOW()
           RETURNING id`,
          [
            field.type,
            field.name,
            field.label,
            personObject.id,
            WORKSPACE_ID,
            field.isNullable,
            field.description,
            field.type === 'CURRENCY' 
              ? JSON.stringify({ amountMicros: 0, currencyCode: 'PKR' })
              : JSON.stringify({ value: field.defaultValue?.replace(/'/g, '').replace(/::text|::boolean/g, '') }),
            field.isUnique || false
          ]
        );

        // Create database columns with unique constraint if needed
        const columnQuery = field.columns 
          ? field.columns.map(col => 
              `ALTER TABLE ${WORKSPACE_SCHEMA}.person
               ADD COLUMN IF NOT EXISTS "${col.name}" ${col.columnType} ${col.isNullable ? '' : 'NOT NULL'} DEFAULT ${col.defaultValue};`
            ).join('\n')
          : `ALTER TABLE ${WORKSPACE_SCHEMA}.person
             ADD COLUMN IF NOT EXISTS "${field.name}" ${field.columnType} ${field.isNullable ? '' : 'NOT NULL'} DEFAULT ${field.defaultValue}${field.isUnique ? `;\nALTER TABLE ${WORKSPACE_SCHEMA}.person ADD CONSTRAINT person_${field.name}_unique UNIQUE ("${field.name}")` : ''};`;
        
        await rawDataSource.query(columnQuery);
        console.log(`Created/Updated field: ${field.name}`);
      } catch (error) {
        console.error(`Failed to process field ${field.name}:`, error);
        throw error;
      }
    }

    console.log('Custom fields created successfully');
  } catch (error) {
    console.error('Failed to create custom fields:', error);
    throw error;
  } finally {
    await rawDataSource.destroy();
  }
}

// Run migration
createMemberDetailFields()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });