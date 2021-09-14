import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from './category.repository';
import { Category } from './category.model';
import { CategoryDto } from './category.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { SubCategoryService } from '../sub-category/sub-category.service';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
   

    @Inject(forwardRef(() => SubCategoryService))
    private subcategoryService: SubCategoryService,
  ) {}

  async create(category: CategoryDto): Promise<Category> {
    return this.categoryRepository.create<Category>(category);
  }

  async findAll(filter: FindOptions) {
    return this.categoryRepository.findAll(filter);
  }

  async findById(id: number): Promise<Category> {
    return this.categoryRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.categoryRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.categoryRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.categoryRepository.upsert(data);
  }

  private async createSubCategories(
    subcategories: string[],
    categoryId: number,
  ) {
    for (let i = 0; i < subcategories.length; i++) {
      const subcategory = subcategories[i];
      const data: any = {
        categoryId: categoryId,
        name: subcategory,
      };
      await this.subcategoryService.create(data);
    }
  }
}
