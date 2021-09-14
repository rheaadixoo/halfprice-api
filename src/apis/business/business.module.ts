import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessRepository } from './business.repository';
import { BusinessService } from './business.service';

@Module({
    imports: [],
    controllers: [BusinessController],
    providers: [BusinessRepository, BusinessService],
    exports: [BusinessService]
})
export class BusinessModule { }
