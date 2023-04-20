import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { LoggingDriverType } from 'dockerode';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger: Logger
    constructor() {
        this.logger = new Logger(HttpException.name)
    }

    catch (exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        this.logger.error(`statusCode: ${status} message: ${exception["response"]["message"]}`);

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception["response"]["message"],
                error: exception.message
            });
    }
}