import { forwardRef, Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryRepository } from './sub-category.repository';
import { SubCategoryService } from './sub-category.service';

@Module({
    imports: [    forwardRef(() => CategoryModule)],
    controllers: [SubCategoryController],
    providers: [SubCategoryRepository, SubCategoryService],
    exports: [SubCategoryService]
})
export class SubCategoryModule { }
