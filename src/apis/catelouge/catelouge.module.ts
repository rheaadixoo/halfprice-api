import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductModule } from '../product/product.module';
import { CatelougeController } from './catelouge.controller';
import { CatelougeRepository } from './catelouge.repository';
import { CatelougeService } from './catelouge.service';

@Module({
    imports: [CommonModule,ProductModule],
    controllers: [CatelougeController],
    providers: [CatelougeRepository, CatelougeService],
    exports: [CatelougeService]
})
export class CatelougeModule { }
