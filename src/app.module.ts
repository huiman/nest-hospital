import { Module } from '@nestjs/common';
import { PatientService } from './patient/patient.service';
import { PatientController } from './patient/patient.controller';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService],
})
export class AppModule {}
