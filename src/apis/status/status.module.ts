import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusRepository } from './status.repository';
import { StatusService } from './status.service';

@Module({
    imports: [],
    controllers: [StatusController],
    providers: [StatusRepository, StatusService],
    exports: [StatusService]
})
export class StatusModule { }
