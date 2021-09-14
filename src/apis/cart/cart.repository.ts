import { Cart } from './cart.model';

export const CART_REPOSITORY = 'CART_REPOSITORY';

export const CartRepository = {
  provide: CART_REPOSITORY,
  useValue: Cart,
};
