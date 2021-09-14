import { SubCategory } from './sub-category.model';

export const SUBCATEGORY_REPOSITORY = 'SUBCATEGORY_REPOSITORY';

export const SubCategoryRepository = {
  provide: SUBCATEGORY_REPOSITORY,
  useValue: SubCategory,
};
