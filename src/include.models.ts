import { Model, ModelCtor } from 'sequelize-typescript';
import { Address } from './apis/address/address.model';
import { Brand } from './apis/brand/brand.model';
import { Business } from './apis/business/business.model';
import { CartDetails } from './apis/cart-details/cart-details.model';
import { Cart } from './apis/cart/cart.model';
import { Category } from './apis/category/category.model';
import { Catelouge } from './apis/catelouge/catelouge.model';
import { Collection } from './apis/collection/collection.model';
import { Color } from './apis/color/color.model';
import { Comments } from './apis/comments/comments.model';
import { ContactUs } from './apis/contact-us/contact-us.model';
import { Invoice } from './apis/invoice/invoice.model';
import { Order } from './apis/order/order.model';
import { Otp } from './apis/otp/otp.model';
import { PaymentGateway } from './apis/payment-gateway/payment-gateway.model';
import { ProductVarients } from './apis/product-varients/product-varients.model';
import { Product } from './apis/product/product.model';
import { Progress } from './apis/progress/progress.model';
import { Status } from './apis/status/status.model';
import { SubCategory } from './apis/sub-category/sub-category.model';
import { Subscription } from './apis/subscription/subscription.model';
import { Transaction } from './apis/transaction/transaction.model';
import { WishlistDetails } from './apis/wishlist-details/wishlist-details.model';
import { Wishlist } from './apis/wishlist/wishlist.model';

export const MODELS: ModelCtor<Model<any, any>>[] = [
  Category,
  Address,
  Color,
  Product,
  Brand,
  Order,
  PaymentGateway,
  Transaction,
  Progress,
  Otp,
  Status,
  Comments,
  Cart,
  Subscription,
  SubCategory,
  // Category
  CartDetails,
  ProductVarients,
  Collection,
  Business,
  Invoice,
  Wishlist,
  Catelouge,
  WishlistDetails,
  ContactUs
];
