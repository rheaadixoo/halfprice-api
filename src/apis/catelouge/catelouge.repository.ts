import { Catelouge } from './catelouge.model';

export const CATELOUGE_REPOSITORY = 'CATELOUGE_REPOSITORY';

export const CatelougeRepository = {
  provide: CATELOUGE_REPOSITORY,
  useValue: Catelouge,
};
