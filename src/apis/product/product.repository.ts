import { Product } from './product.model';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export const ProductRepository = {
  provide: PRODUCT_REPOSITORY,
  useValue: Product,
};
