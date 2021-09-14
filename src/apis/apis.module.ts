import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/apis/category/category.module';
import { SubCategoryModule } from 'src/apis/sub-category/sub-category.module';
import { AddressModule } from 'src/apis/address/address.module';
import { SharedModule } from './shared/shared.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ColorModule } from 'src/apis/color/color.module';
import { ProductModule } from 'src/apis/product/product.module';
import { OrderModule } from 'src/apis/order/order.module';
import { PaymentGatewayModule } from 'src/apis/payment-gateway/payment-gateway.module';
import { TransactionModule } from 'src/apis/transaction/transaction.module';
import { ProgressModule } from 'src/apis/progress/progress.module';
import { OtpModule } from 'src/apis/otp/otp.module';
import { PaymentModule } from 'src/apis/payment/payment.module';
import { StatusModule } from 'src/apis/status/status.module';
import { CommentsModule } from 'src/apis/comments/comments.module';
import { BrandModule } from 'src/apis/brand/brand.module';
import { ProductVarientsModule } from 'src/apis/product-varients/product-varients.module';
import { SubscriptionModule } from 'src/apis/subscription/subscription.module';
import { CartModule } from './cart/cart.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CollectionModule } from 'src/apis/collection/collection.module';
import { InvoiceModule } from 'src/apis/invoice/invoice.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CatelougeModule } from './catelouge/catelouge.module';
import { WishlistDetailsModule } from 'src/apis/wishlist-details/wishlist-details.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { DeliveryModule } from 'src/apis/delivery/delivery.module';
import { MasterOrderModule } from 'src/apis/master-order/master-order.module';
  

@Module({
  imports: [
    CategoryModule,
    SubCategoryModule,
    AddressModule,
    FileUploadModule,
    ColorModule,
    ProductModule,
    OrderModule,
    PaymentGatewayModule,
    TransactionModule,
    ProgressModule,
    OtpModule,
    PaymentModule,
    StatusModule,
    CommentsModule, 
    BrandModule, 
    ProductVarientsModule, 
    SubscriptionModule,
    CartModule, 
    CartDetailsModule, 
    CollectionModule, 
    InvoiceModule, 
    WishlistModule, 
    CatelougeModule, 
    WishlistDetailsModule, 
    ContactUsModule,
  DeliveryModule, 
  MasterOrderModule],
  providers: [],
  exports: [],
})
export class ApisModule {}
