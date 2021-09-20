import {
  Injectable,
  Inject,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { ORDER_REPOSITORY } from './order.repository';
import { Order } from './order.model';
import { OrderDto } from './order.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { UserService } from 'src/core/user/user.service';
import { PaymentService } from '../payment/payment.service';
import { AddressService } from '../address/address.service';
import { Address } from '../address/address.model';
import { ProgressService } from '../progress/progress.service';
import { ConfigService } from '@nestjs/config';
import { CanNotificationService } from '@can/notification';
import { User } from 'src/core/user/user.model';
import { ProductService } from '../product/product.service';
import * as _ from 'lodash';
import { CartService } from '../cart/cart.service';
import { CartDetailsService } from '../cart-details/cart-details.service';
import { MasterOrderService } from '../master-order/master-order.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    private userService: UserService,
    @Inject(forwardRef(() => PaymentService))
    private paymentService: PaymentService,
    @Inject(forwardRef(() => ProgressService))
    private progressService: ProgressService,
    private addressService: AddressService,
    private configService: ConfigService,
    private cartService: CartService,
    private cartDetailsService:CartDetailsService,
    private notificationService: CanNotificationService,
    private productService:ProductService,
    private masterOrderService: MasterOrderService
  ) {}

  async create(order: OrderDto): Promise<any> {
    const user = await this.userService.findOne({
      where: { id: order.userId },
      include: [{ all: true }],
    });
    if (!user) {
      throw new UnprocessableEntityException(
        `User with id ${order.userId} doesn't exist in system!`,
      );
    }

      const foundAddress = await this.addressService.findById(order.addressId)

      if (!foundAddress) {
        throw new UnprocessableEntityException('User address not found');
      }
      const totalAmountRes = await this.getOrderAmount(order.cartId);
      if( typeof totalAmountRes  == 'string'){
        throw new UnprocessableEntityException(
          `Product ${order.userId} is out of stock`,
        );
      }else{
        order.totalAmount = totalAmountRes
        order.totalAmount = 1
      }
      this.createSupplierOrders(order);
      if (order.payLater) {
        return this.masterOrderService.create(order)
        // return this.orderRepository.create<Order>(order);
      }{
        // const createdOrder = await this.orderRepository.create<Order>(order);
        const createdOrder = await this.masterOrderService.create(order);

        // this.createProgress(createdOrder);
        const txnToken = await this.paymentService.createTxnToken(
          {
            consumerId: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            pinCode: foundAddress.pinCode,
            address: foundAddress.address,
            orderId: `${createdOrder.orderNumber}_${createdOrder.txnCount}`,
            transactionAmount: createdOrder.totalAmount,
          },
          createdOrder,
        );
        return { txnToken, order: createdOrder };
      }
    
  }

  async createSupplierOrders(order: OrderDto){
    const cartDetails = await this.cartDetailsService.findAll({where:{ cartId: order.cartId },include:[{all: true}]});
    
    for (let i = 0; i < cartDetails.length; i++) {
      const bussiness = _.groupBy(cartDetails[i],'businessId')
      const businessKeys = Object.keys(bussiness)
      for (let index = 0; index < businessKeys.length; index++) {
        let totalAmount = 0;
        for (let j = 0; j < bussiness[businessKeys[index]].length; j++) {
          const cartDetail = bussiness[businessKeys[index]][j]
            totalAmount += cartDetail.product.sellingPrice * cartDetail.quantity         
        }
        order.totalAmount = totalAmount
        await this.create(order)
      }
      } 
    
  }
  async getOrderAmount(cartId){
    const cartDetails = await this.cartDetailsService.findAll({where:{ cartId },include:[{all: true}]});
    let totalAmount = 0;
    for (let i = 0; i < cartDetails.length; i++) {
      if(cartDetails[i].product.availableStock >= cartDetails[i].quantity){
        totalAmount += cartDetails[i].product.sellingPrice * cartDetails[i].quantity
      }else{
        return `${cartDetails[i].product.name}`
      }
      } 
      return totalAmount;
  }
  isAvailable(final , id){
    for (let index = 0; index < final.length; index++) {
      if(final[index].id == id){
        return {available:true, index: index}
      }      
    }
    return {available:false};

  }

  async getOrderDetails(orderId, orderData?, orderTable?){
    const order = orderData?orderData:await this.findById(orderId);
    let tableData = ``, totalItems = [];
    const products = [];
    for (let i = 0; i < order.packageDetails.length; i++) {
      
        // let items = []
        for (let j = 0; j < order.packageDetails[i]['categories'].length; j++) {
          totalItems = [...totalItems, ...order.packageDetails[i]['categories'][j]['items']]
        }
        
      }
      const groupedItems = _.groupBy(
        totalItems, 
        (item: any) => item.pId,
      );
      const itemsKey = Object.keys(groupedItems);
      for (let k = 0; k < itemsKey.length; k++) {
      // const product = await this.productService.findById(parseInt(itemsKey[k]))
      const product = await this.productService.findAll({
        where: { id : parseInt(itemsKey[k]) },
          include: [{ all: true }]
      }) 
        tableData +=  `<tr valign="top" style="vertical-align: top;"><th class="column mobile-12 mobile-padding-bottom" width="510" style="padding-left: 30px; padding-right: 10px; color: #333333; font-weight: 400; text-align: left;"><div style=" font-size: 17px; margin-bottom: 30px; border:1px solid #eee; padding: 10px 10px;">${product[0].name}<p style="margin-top: 4px; font-weight: bold;">Quantity: <span style="color: #1264AD; font-weight: bold;">${groupedItems[itemsKey[k]].length}</span></p></div></th><th class="column mobile-12" width="110" style="padding-left: 10px; padding-right: 30px; color: #333333; font-weight: 400; text-align: left;"><div style="font-size: 17px; font-weight: bold; margin-bottom: 30px;  border:1px solid #eee; padding: 10px 10px; color: #1264AD;"> ₹ ${product[0].sellingPrice * groupedItems[itemsKey[k]].length}</div></th></tr>`
        products.push({...product[0]['dataValues'], quantity:groupedItems[itemsKey[k]].length})
      }
      return orderTable?tableData:products;
  }
  private async createProgress(order: Order) {
    this.progressService.create({
      orderId: order.id,
      progress: 'Booking Received',
      userId: order.userId,
    } as any);
  }

  async retryOrderTransaction(orderNumber: string, payLater: boolean = false) {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
      include: [{ all: true }],
    });
    if (!order) {
      throw new UnprocessableEntityException('Order number is not valid');
    }
    // const foundAddress = await this.addressService.findAll({
    //   where: { userId: order.user.id, default: true },
    // });
    const foundAddress = await this.addressService.findById(order.addressId)

    if (!foundAddress) {
      throw new UnprocessableEntityException('User address not found');
    }

    if (payLater) {
      await this.updateById(order.id, { payLater });
      return { order };
    } else {
      const newOrderNumber = `${order.orderNumber}_${order.txnCount + 1}`;
      const txnToken = await this.paymentService.createTxnToken(
        {
          consumerId: order.user.id.toString(),
          firstName: order.user.firstName,
          lastName: order.user.lastName,
          email: order.user.email,
          mobile: order.user.mobile,
          pinCode: foundAddress.pinCode,
          address: foundAddress.address,
          orderId: newOrderNumber,
          transactionAmount: order.totalAmount,
        },
        order,
      );
      await this.updateById(order.id, { txnCount: order.txnCount + 1 });
      return { txnToken, order: order };
    }
  }

  async calculateOrderAmount(cartId: number): Promise<any> {
    const basket = await this.cartService.findById(cartId);
    if (!basket) {
      throw new UnprocessableEntityException('basket id is not valid');
    }
    const bookingAmount = this.calculateBookingAmount(basket.totalAmount);

    return {
      bookingAmount,
      totalAmount: basket.totalAmount ,
    };
  }

  private calculateBookingAmount(packageAmount: number) {
    const bookingFlatValue = parseFloat(
      this.configService.get('BOOKING_AMOUNT_MAX_VALUE'),
    );
    const bookingPercentageValue = parseInt(
      this.configService.get('BOOKING_AMOUNT_PERCENTAGE_VALUE'),
    );
    return this.calculateAmount(
      bookingFlatValue,
      bookingPercentageValue,
      packageAmount,
    );
  }

  private calculateAmount(
    flatValue: number,
    percentageValue: number,
    packageAmount: number,
  ) {
    let totalAmount = 0;
    if (flatValue === 0 && percentageValue > 0) {
      totalAmount = (packageAmount * percentageValue) / 100;
    } else if (flatValue > 0 && percentageValue > 0) {
      const amount = (packageAmount * percentageValue) / 100;
      if (flatValue < amount) {
        totalAmount = flatValue;
      } else {
        totalAmount = amount;
      }
    }
    return totalAmount;
  }

  async findAll(filter: FindOptions) {
    return this.orderRepository.findAll(filter);
  }

  async findById(id: number, filter? : FindOptions): Promise<Order> {
    return filter?this.orderRepository.findByPk(id,{include:filter.include}):this.orderRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.orderRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
      
      const order = await this.orderRepository.findOne({where: { id: id }})
      const user:any = await this.getUser(order.userId)
      if(data.hasOwnProperty('status') && data.status != 'open'){
        const progress = await this.progressService.findAll({where :{orderId : id} , order:[["createdAt","DESC"]]})
        let images = `<tr>`
        let text = false;
       if(progress && progress.length && progress[0].images &&  progress[0].images.length){
         text = true;
        for(let i=0; i< progress[0].images.length; i++){
          images +=  `<th class="column mobile-12 mobile-padding-bottom-mini" width="90" style="padding-left: 30px; padding-right: 10px; text-align: left;"><a href="${progress[0].images[i]}"><img src="${progress[0].images[i]}" alt="Product 1" width="90" style="border: 0; width: 100%; max-width: 90px;"></a></th>`
        }
       }
       
        images += `</tr>`
        await this.notificationService.sendNotification({
          category: 'Orders',
          trigger: 'ORDER_UPDATE',
          data: {
            firstName: user.firstName,
            orderId : order.orderNumber,
            newStatus : data.updatedStatus,
            body : images,
            message : progress[0].remarks,
            text
          },
          email: {
            to: [user.email],
          }
        });
      }
      if(data.hasOwnProperty('representativeId') && order && !order.representativeId){
        const representative:any = await this.getUser(data.representativeId)
        await this.notificationService.sendNotification({
          category: 'Orders',
          trigger: 'REPRESENTATIVE_ASSIGNED',
          data: {
            firstName: user.firstName,
            orderId : order.orderNumber,
            repName : representative.name,
            repNumber : representative.mobile
          },
          email: {
            to: [user.email],
          }
        });
      
    }
    
    return this.orderRepository.update(data, { where: { id } });
  }

  async getUser(id){
    // new Promise( async(resolve, reject) =>{
      const user = await this.userService.findOne({
        where: { id: id }
      });
      // resolve(user)
      return user;
    // })
  }
  async upsert(data: object) {
    return this.orderRepository.upsert(data);
  }
}
