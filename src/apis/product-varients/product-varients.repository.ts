import { ProductVarients } from './product-varients.model';

export const PRODUCTVARIENTS_REPOSITORY = 'PRODUCTVARIENTS_REPOSITORY';

export const ProductVarientsRepository = {
  provide: PRODUCTVARIENTS_REPOSITORY,
  useValue: ProductVarients,
};
