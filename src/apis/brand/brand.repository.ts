import { Brand } from './brand.model';

export const BRAND_REPOSITORY = 'BRAND_REPOSITORY';

export const BrandRepository = {
  provide: BRAND_REPOSITORY,
  useValue: Brand,
};
