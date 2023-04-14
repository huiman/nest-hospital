import { Patient } from "@prisma/client";
import { IsNumber, IsString, IsDate, IsOptional, IsDateString } from "class-validator";

export class PatientDTO implements Readonly<Patient>{
    @IsNumber() @IsOptional() id: number;
    @IsNumber() hospitalId: number;
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsDateString() birthDate: Date;
    @IsString() gender: string;
    @IsDateString() createdAt: Date;
    @IsDateString() updatedAt: Date;
    @IsDateString() @IsOptional() deletedAt: Date;
    @IsNumber() createdBy: number;
    @IsNumber() updatedBy: number;
    @IsNumber() @IsOptional() deletedBy: number;
}

export class GetPatientsDTO {
    @IsNumber() readonly page: number;
    @IsNumber() readonly pageSize: number;
}