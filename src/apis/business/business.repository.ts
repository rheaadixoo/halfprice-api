import { Business } from './business.model';

export const BUSINESS_REPOSITORY = 'BUSINESS_REPOSITORY';

export const BusinessRepository = {
  provide: BUSINESS_REPOSITORY,
  useValue: Business,
};
