import { Module } from '@nestjs/common';
import { ProductVarientsController } from './product-varients.controller';
import { ProductVarientsRepository } from './product-varients.repository';
import { ProductVarientsService } from './product-varients.service';

@Module({
    imports: [],
    controllers: [ProductVarientsController],
    providers: [ProductVarientsRepository, ProductVarientsService],
    exports: [ProductVarientsService]
})
export class ProductVarientsModule { }
