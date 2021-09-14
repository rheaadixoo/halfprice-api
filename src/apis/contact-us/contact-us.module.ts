import { Module } from '@nestjs/common';
import { ContactUsController } from './contact-us.controller';
import { ContactUsRepository } from './contact-us.repository';
import { ContactUsService } from './contact-us.service';

@Module({
    imports: [],
    controllers: [ContactUsController],
    providers: [ContactUsRepository, ContactUsService],
    exports: [ContactUsService]
})
export class ContactUsModule { }
