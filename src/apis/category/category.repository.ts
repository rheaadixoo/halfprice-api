import { Category } from './category.model';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export const CategoryRepository = {
  provide: CATEGORY_REPOSITORY,
  useValue: Category,
};
