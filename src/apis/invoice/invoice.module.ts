import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PdfService } from 'src/common/services/pdf/pdf.service';
import { AddressModule } from '../address/address.module';
import { BusinessModule } from '../business/business.module';
import { CartDetailsModule } from '../cart-details/cart-details.module';
import { CartModule } from '../cart/cart.module';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceService } from './invoice.service';

@Module({
    imports: [CartDetailsModule, CommonModule, CartModule , AddressModule, BusinessModule],
    controllers: [InvoiceController],
    providers: [InvoiceRepository, InvoiceService, PdfService],
    exports: [InvoiceService]
})
export class InvoiceModule { }
