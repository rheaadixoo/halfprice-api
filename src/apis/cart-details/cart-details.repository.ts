import { CartDetails } from './cart-details.model';

export const CARTDETAILS_REPOSITORY = 'CARTDETAILS_REPOSITORY';

export const CartDetailsRepository = {
  provide: CARTDETAILS_REPOSITORY,
  useValue: CartDetails,
};
