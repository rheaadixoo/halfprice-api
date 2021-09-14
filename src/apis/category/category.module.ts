import { forwardRef, Module } from '@nestjs/common';
import { SubCategoryModule } from '../sub-category/sub-category.module';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [
    forwardRef(() => SubCategoryModule),
    
    ],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
