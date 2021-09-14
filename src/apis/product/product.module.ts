import { CanCommonModule } from '@can/common';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
    imports: [CanCommonModule],
    controllers: [ProductController],
    providers: [ProductRepository, ProductService],
    exports: [ProductService]
})
export class ProductModule { }
