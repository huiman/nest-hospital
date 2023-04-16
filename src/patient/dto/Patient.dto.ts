import { Patient } from "@prisma/client";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class PatientDTO implements Readonly<Patient>{
    @IsNumber() @IsOptional() id: number;
    @IsNumber() hospitalId: number;
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsDateString() birthDate: Date;
    @IsString() gender: string;
    @IsDateString() @IsOptional() createdAt: Date;
    @IsDateString() @IsOptional() updatedAt: Date;
    @IsDateString() @IsOptional() deletedAt: Date;
    @IsNumber() @IsOptional() createdBy: number;
    @IsNumber() @IsOptional() updatedBy: number;
    @IsNumber() @IsOptional() deletedBy: number;
}

export class GetPatientsDTO {
    @IsNumber() readonly page: number;
    @IsNumber() readonly pageSize: number;
}