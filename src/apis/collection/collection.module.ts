import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionRepository } from './collection.repository';
import { CollectionService } from './collection.service';

@Module({
    imports: [],
    controllers: [CollectionController],
    providers: [CollectionRepository, CollectionService],
    exports: [CollectionService]
})
export class CollectionModule { }
