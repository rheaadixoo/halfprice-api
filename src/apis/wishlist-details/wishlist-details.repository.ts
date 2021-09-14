import { WishlistDetails } from './wishlist-details.model';

export const WISHLISTDETAILS_REPOSITORY = 'WISHLISTDETAILS_REPOSITORY';

export const WishlistDetailsRepository = {
  provide: WISHLISTDETAILS_REPOSITORY,
  useValue: WishlistDetails,
};
