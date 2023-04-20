import { Module } from '@nestjs/common';
import { GateWay } from './gatway';

@Module({
    providers: [GateWay]
})
export class GatewayModule { }
