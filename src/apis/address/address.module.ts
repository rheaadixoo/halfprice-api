import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';

@Module({
    imports: [],
    controllers: [AddressController],
    providers: [AddressRepository, AddressService],
    exports: [AddressService]
})
export class AddressModule { }
