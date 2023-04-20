import { Logger, Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PatientService } from './patient/patient.service';
import { PatientController } from './patient/patient.controller';
import { PrismaService } from './prisma.service';
import { LoggerMiddleware } from './utils/logger.middleware';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [PatientController],
  providers: [PatientService, PrismaService, Logger],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
