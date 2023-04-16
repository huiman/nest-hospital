import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { PatientDTO } from './dto/Patient.dto';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
    constructor(private patientService: PatientService) { }

    // create Patient
    @Post()
    async createPatient (@Res() res, @Body() patientDTO: PatientDTO) {
        const newPatient = await this.patientService.createPatient(patientDTO)
        return res.status(HttpStatus.OK).json({
            response: 'Patient record sucessfully created.',
            patient: newPatient
        })
    }

    //get Patient by Id
    @Get('/:patientID')
    async getPatient (@Res() res, @Param('patientID') patientID: number) {
        const patient = await this.patientService.getPatient(patientID)
        if (patient) {
            return res.status(HttpStatus.OK).json(patient)
        }
        throw new NotFoundException('Patient not exist.')
    }

    //get all patient
    @Get()
    async getPatients (@Res() res, @Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
        const response = await this.patientService.getPatients(page, pageSize)
        return res.status(HttpStatus.OK).json(response)
    }

    // update patient
    @Put()
    async updatePatient (@Res() res, @Body() patientDTO: PatientDTO) {
        const updatePatient = await this.patientService.updatePatient(patientDTO)
        if (updatePatient) {
            return res.status(HttpStatus.OK).json({
                response: 'Patient has been successfully updated.',
                patient: updatePatient
            })
        }
        throw new NotFoundException('Patient does not exist.')
    }

    //soft delete
    @Delete('/:patientID')
    async softDeletePatient (@Res() res, @Param('patientID') patientID: number) {
        const deletePatient = await this.patientService.softDeletePatient(patientID)
        if (deletePatient) {
            return res.status(HttpStatus.OK).json({
                message: 'Patient has been deleted!',
                patient: deletePatient,
            })
        }
        throw new NotFoundException('Patient does not exist!');
    }

    @Delete('/hard/:patientID')
    async deletePatient (@Res() res, @Param('patientID') patientID: number) {
        const deletePatient = await this.patientService.deletePatient(patientID)
        if (deletePatient) {
            return res.status(HttpStatus.OK).json({
                message: 'Patient has been hard deleted!',
                patient: deletePatient,
            })
        }
        throw new NotFoundException('Patient does not exist!');
    }

    // search Patient
    @Post('/search')
    async searchPatient (@Res() res, @Body() filter: PatientDTO) {
        const patients = await this.patientService.searchPatients(filter)
        return res.status(HttpStatus.OK).json(patients)
    }
}