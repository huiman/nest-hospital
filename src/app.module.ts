import { Module } from '@nestjs/common';
import { PatientService } from './patient/patient.service';
import { PatientController } from './patient/patient.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
})
export class AppModule { }
