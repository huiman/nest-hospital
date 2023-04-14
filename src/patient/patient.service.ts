import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import prisma from 'src/prisma';

@Injectable()
export class PatientService {

    async getPatients (page: number, pageSize: number): Promise<Patient[]> {
        const numPage = Number(page), numPageSize = Number(pageSize)
        const skip = (numPage - 1) * numPageSize
        return await prisma.patient.findMany({
            skip: skip,
            take: numPageSize,
            where: {
                deletedAt: null
            }

        })
    }



    async getPatient (patientId: number): Promise<Patient> {
        return await prisma.patient.findFirst({
            where: {
                id: Number(patientId),
                deletedAt: null
            }
        })
    }

    async createPatient (patientSchema: Patient): Promise<Patient> {
        const createPatientSchema = patientSchema
        delete createPatientSchema.id
        return await prisma.patient.create(
            { data: patientSchema }
        )
    }

    async updatePatient (patientSchema: Patient): Promise<Patient> {
        const { id, ...updatePatientSchema } = patientSchema;
        return await prisma.patient.update({
            where: {
                id
            },
            data: updatePatientSchema
        })
    }

    async softDeletePatient (patientId: number): Promise<Patient> {
        return await prisma.patient.update({
            where: {
                id: Number(patientId)
            },
            data: { deletedAt: new Date() }
        })
    }

    async deletePatient (patientId: number): Promise<Patient> {
        return await prisma.patient.delete({
            where: {
                id: Number(patientId)
            }
        })
    }

    async searchPatients (searchPatientSchema: Patient): Promise<Patient[]> {
        return await prisma.patient.findMany({
            where: searchPatientSchema
        })
    }
}
