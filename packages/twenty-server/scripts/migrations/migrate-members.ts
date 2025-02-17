import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { RowDataPacket } from 'mysql2';
import { createConnection } from 'mysql2/promise';

import { rawDataSource } from 'src/database/typeorm/raw/raw.datasource';

const WORKSPACE_ID = '3b8e6458-5fc1-4e63-8563-008ccddaa6d9';
const WORKSPACE_SCHEMA = 'workspace_3ixj3i1a5avy16ptijtb3lae3';

interface Member extends RowDataPacket {
  id: number;
  membershipNumber: string;
  firstName: string;
  lastName: string;
  legalName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
}

function parsePhoneNumber(fullNumber: string | null) {
  if (!fullNumber) {
    return {
      phoneNumber: null,
      callingCode: null,
      countryCode: null
    };
  }

  try {
    const parsed = parsePhoneNumberWithError(fullNumber, { extract: true });
    
    if (parsed) {
      return {
        phoneNumber: parsed.nationalNumber,
        callingCode: `+${parsed.countryCallingCode}`,
        countryCode: parsed.country
      };
    }
  } catch (error) {
    console.warn(`Failed to parse phone number: ${fullNumber}`, error);
  }

  return {
    phoneNumber: fullNumber,
    callingCode: '',
    countryCode: ''
  };
}

function getNames(member: Member) {
  if (member.firstName || member.lastName) {
    return {
      firstName: member.firstName || '',
      lastName: member.lastName || ''
    };
  }
  
  const [firstName, ...lastNameParts] = (member.legalName || '').split(' ');
  return {
    firstName: firstName || '',
    lastName: lastNameParts.join(' ') || ''
  };
}

async function migratePersons() {
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
    const [members] = await mysqlConnection.query<Member[]>(`
      SELECT 
        u.id,
        u.membershipNumber,
        u.firstName,
        u.lastName,
        u.legalName,
        u.email,
        u.phoneNumber,
        u.createdAt
      FROM users u
    `);

    console.log(`Found ${members.length} members to migrate`);

    for (const member of members) {
      try {
        const { firstName, lastName } = getNames(member);
        const parsedPhone = parsePhoneNumber(member.phoneNumber);

        await rawDataSource.query(
          `INSERT INTO ${WORKSPACE_SCHEMA}.person (
            "nameFirstName",
            "emailsPrimaryEmail",
            "emailsAdditionalEmails",
            "phonesPrimaryPhoneNumber",
            "phonesPrimaryPhoneCountryCode",
            "phonesPrimaryPhoneCallingCode",
            "phonesAdditionalPhones",
            "createdBySource",
            "membershipNumber",
            "createdAt",
            "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            firstName,                    // nameFirstName
            member.email || null,         // emailsPrimaryEmail
            '[]',                         // emailsAdditionalEmails
            parsedPhone.phoneNumber,      // phonesPrimaryPhoneNumber
            parsedPhone.countryCode || 'PK',  // phonesPrimaryPhoneCountryCode
            parsedPhone.callingCode || '+92', // phonesPrimaryPhoneCallingCode
            '[]',                         // phonesAdditionalPhones
            'MANUAL',                     // createdBySource
            member.membershipNumber,      // membershipNumber
            member.createdAt,            // createdAt
            member.createdAt             // updatedAt
          ]
        );
        console.log(`Migrated member: ${member.membershipNumber}`);
      } catch (error) {
        console.error(
          `Failed to migrate member ${member.membershipNumber}:`,
          error
        );
        continue;
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await mysqlConnection.end();
    await rawDataSource.destroy();
  }
}

// Run migration
migratePersons()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
