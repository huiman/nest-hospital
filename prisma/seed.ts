import { MedicalRecord, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main () {
    //------------------setting-------------------------
    const no_of_seed_hospital = 3
    const no_of_seed_patient_per_hospital = 100
    const no_of_medical_record_per_patient = 4
    //------------------setting-------------------------

    // seed one login user then use id for all seed data
    const userSeed = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'test@tests.com',
        password: "pass",
    }
    const user = await prisma.user.upsert({
        where: {
            email: userSeed.email
        },
        update: {},
        create: userSeed
    })
    console.log(user);

    // hospital seed
    const hospitalSeed = () => {
        return {
            name: faker.company.name() + ' Hospital',
            Hospital_createdby: { connect: { id: user.id } },
            Hospital_updatedby: { connect: { id: user.id } }
        }
    }
    //seed Adrress
    const addressSeed = () => {
        return {
            addressType: 1,
            patient: undefined,
            hospital: undefined,
            organization: faker.company.name().substring(0, 120),
            address: faker.address.streetAddress().substring(0, 400),
            district: faker.address.county(),
            province: faker.address.city().substring(0, 35),
            postal_code: faker.address.zipCode().substring(0, 5),
            Address_createdby: { connect: { id: user.id } },
            Address_updatedby: { connect: { id: user.id } },
        }
    }
    const emailSeed = () => {
        return {
            hospital: undefined,
            patient: undefined,
            emailType: 1,
            email: "hospital_" + faker.internet.email(),
            Email_createdby: { connect: { id: user.id } },
            Email_updatedby: { connect: { id: user.id } }
        }
    }
    const phoneSeed = () => {
        return {
            hospital: undefined,
            patient: undefined,
            phoneType: 1,
            phone_no: faker.phone.number(),
            Phone_createdby: { connect: { id: user.id } },
            Phone_updatedby: { connect: { id: user.id } }
        }
    }
    const patientSeed = () => {
        return {
            hospital: undefined,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            birthDate: faker.date.birthdate(),
            gender: faker.name.sex() === 'male' ? 'M' : 'F',
            Patient_createdby: { connect: { id: user.id } },
            Patient_updatedby: { connect: { id: user.id } }
        }
    }
    const medicalRercordSeed = () => {
        return {
            hospital: undefined,
            patient: undefined,
            diagnosis: faker.random.words(5),
            treatment: faker.random.words(10),
            notes: faker.random.words(20),
            MedicalRecord_createdby: { connect: { id: user.id } },
            MedicalRecord_updatedby: { connect: { id: user.id } }
        }
    }

    for (let i = 0; i < no_of_seed_hospital; i++) {
        // seed 1 hospital
        const newHospitalSeed = hospitalSeed()
        const hospital = await prisma.hospital.upsert({
            where: {
                name: newHospitalSeed.name
            },
            update: {},
            create: newHospitalSeed
        })

        const newAddressSeed = addressSeed()
        newAddressSeed.hospital = { connect: { id: hospital.id } }
        const hospitalAddress = await prisma.address.upsert({
            where: {
                organization: newAddressSeed.organization
            },
            update: {},
            create: newAddressSeed
        })

        const newEmailSeed = emailSeed()
        newEmailSeed.hospital = { connect: { id: hospital.id } }
        const hospitalEmail = await prisma.email.upsert({
            where: {
                email: newEmailSeed.email
            },
            update: {},
            create: newEmailSeed
        })

        const newPhoneSeed = phoneSeed()
        newPhoneSeed.hospital = { connect: { id: hospital.id } }
        const hospitalPhone = await prisma.phone.upsert({
            where: {
                phone_no: newPhoneSeed.phone_no
            },
            update: {},
            create: newPhoneSeed
        })

        console.log(`seed hospital: ${i + 1} hospital: ${hospital.name}`);

        // seed 1000 patients
        for (let j = 0; j < no_of_seed_patient_per_hospital; j++) {
            const newPatientSeed = patientSeed()
            newPatientSeed.hospital = { connect: { id: hospital.id } }
            const patient = await prisma.patient.upsert({
                where: {
                    firstName_lastName: { firstName: newPatientSeed.firstName, lastName: newPatientSeed.lastName }
                },
                update: {},
                create: newPatientSeed
            })

            const newPatientAddressSeed = addressSeed()
            newPatientAddressSeed.hospital = { connect: { id: hospital.id } }
            newPatientAddressSeed.patient = { connect: { id: patient.id } }
            const patientAddress = await prisma.address.upsert({
                where: {
                    organization: newPatientAddressSeed.organization
                },
                update: {},
                create: newPatientAddressSeed
            })

            const newPatientEmailSeed = emailSeed()
            newPatientEmailSeed.hospital = { connect: { id: hospital.id } }
            newPatientEmailSeed.patient = { connect: { id: patient.id } }
            const patientEmail = await prisma.email.upsert({
                where: {
                    email: newPatientEmailSeed.email
                },
                update: {},
                create: newPatientEmailSeed
            })

            const newPatientPhoneSeed = phoneSeed()
            newPatientPhoneSeed.hospital = { connect: { id: hospital.id } }
            newPatientPhoneSeed.patient = { connect: { id: patient.id } }
            const patientPhone = await prisma.phone.upsert({
                where: {
                    phone_no: newPatientPhoneSeed.phone_no
                },
                update: {},
                create: newPatientPhoneSeed
            })

            for (let k = 0; k < no_of_medical_record_per_patient; k++) {
                // seed medicatal record
                const newPatientMedicalRecordSeed = medicalRercordSeed()
                newPatientMedicalRecordSeed.hospital = { connect: { id: hospital.id } }
                newPatientMedicalRecordSeed.patient = { connect: { id: patient.id } }
                const MedicalRecord = await prisma.medicalRecord.create({
                    data: newPatientMedicalRecordSeed
                })
            }

            console.log(`seed hospital: ${i + 1} patient:${j + 1}`);
        }
    }







}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });