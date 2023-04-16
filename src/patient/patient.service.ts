import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
// import prisma from 'src/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatientService {
    constructor(private readonly prisma: PrismaService) { }

    async getPatients (page: number, pageSize: number): Promise<{ totalPages: number, patients: Patient[] }> {
        const numPage = Number(page), numPageSize = Number(pageSize)
        const skip = (numPage - 1) * numPageSize
        const response = await this.prisma.$transaction([
            this.prisma.patient.count({
                where: {
                    deletedAt: null
                }
            }),
            this.prisma.patient.findMany({
                skip: skip,
                take: numPageSize,
                where: {
                    deletedAt: null
                }

            })
        ])
        return {
            totalPages: response[0] ?? 0,
            patients: response[1]
        }
    }

    async getPatient (patientId: number): Promise<Patient> {
        return await this.prisma.patient.findFirst({
            select: {
                id: true,
                hospitalId: true,
                firstName: true,
                lastName: true,
                birthDate: true,
                gender: true,
                createdAt: true,
                createdBy: true,
                updatedAt: true,
                updatedBy: true,
                deletedAt: true,
                deletedBy: true,
                hospital: true,
                Address: true,
                Email: true,
                Phone: true,
                MedicalRecord: true
            },
            where: {
                id: Number(patientId),
                deletedAt: null
            }
        })
    }

    async createPatient (patientSchema: Patient): Promise<Patient> {
        const createPatientSchema = patientSchema
        delete createPatientSchema.id
        return await this.prisma.patient.create(
            { data: patientSchema }
        )
    }

    async updatePatient (patientSchema: Patient): Promise<Patient> {
        const { id, ...updatePatientSchema } = patientSchema;
        return await this.prisma.patient.update({
            where: {
                id
            },
            data: updatePatientSchema
        })
    }

    async softDeletePatient (patientId: number): Promise<Patient> {
        return await this.prisma.patient.update({
            where: {
                id: Number(patientId)
            },
            data: { deletedAt: new Date() }
        })
    }

    async deletePatient (patientId: number): Promise<Patient> {
        return await this.prisma.patient.delete({
            where: {
                id: Number(patientId)
            }
        })
    }

    async searchPatients (searchString: Patient): Promise<Patient[]> {
        return await this.prisma.patient.findMany({
            where: searchString
            // where: {
            //     firstName: {
            //         contains: searchString
            //     },
            //     lastName: {
            //         contains: searchString
            //     }
            // }
        })
    }
}
