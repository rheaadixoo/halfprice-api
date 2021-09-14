import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SUBCATEGORY_REPOSITORY } from './sub-category.repository';
import { SubCategory } from './sub-category.model';
import { SubCategoryDto } from './sub-category.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { CategoryService } from '../category/category.service';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject(SUBCATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
    
    @Inject(forwardRef(() => CategoryService))
    private categoryService : CategoryService,
  ) {}

  async create(subCategory: SubCategoryDto): Promise<SubCategory> {
    return this.subCategoryRepository.create<SubCategory>(subCategory);
  }

  // async findAll(filter: FindOptions) {
  //   const subCategory = await this.subCategoryRepository.findAll(filter)
  //   const subCat = []
  //   for (let index = 0; index < subCategory.length; index++) {
  //     const category = await this.categoryService.findById(subCategory[index]['categoryId'])
  //     subCat.push({
  //       ...JSON.parse(JSON.stringify(subCategory[index])),
  //       category : JSON.parse(JSON.stringify(category))
  //     })
  //   }
  //   return subCategory;
  // }

    // mappedUser.permissions = permissions;


     async findAll(filter: FindOptions) {
    const subCategory = await this.subCategoryRepository.findAll(filter)
    // const subCat = []
    // for (let index = 0; index < subCategory.length; index++) {
    //   const category = await this.categoryService.findById(subCategory[index]['categoryId'])
    //   subCat.push({
    //     ...JSON.parse(JSON.stringify(subCategory[index])),
    //     category : JSON.parse(JSON.stringify(category))
    //   })
    // }
    return subCategory;
  }

    

  async findById(id: number): Promise<SubCategory> {
    return this.subCategoryRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.subCategoryRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.subCategoryRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.subCategoryRepository.upsert(data);
  }
}
