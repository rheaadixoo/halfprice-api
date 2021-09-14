import { Wishlist } from './wishlist.model';

export const WISHLIST_REPOSITORY = 'WISHLIST_REPOSITORY';

export const WishlistRepository = {
  provide: WISHLIST_REPOSITORY,
  useValue: Wishlist,
};
