import { Injectable, Inject, HttpService } from '@nestjs/common';
import { DELIVERY_REPOSITORY } from './delivery.repository';
import { Delivery } from './delivery.model';
import { DeliveryDto } from './delivery.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { ConfigService } from '@nestjs/config';
import { BusinessService } from '../business/business.service';
import { AddressService } from '../address/address.service';
import { UserService } from 'src/core/user/user.service';
import { AxiosRequestConfig } from 'axios';
import { OrderService } from '../order/order.service';

@Injectable()
export class DeliveryService {
  constructor(
    @Inject(DELIVERY_REPOSITORY) private readonly deliveryRepository: typeof Delivery,
    private configService: ConfigService,
    private httpService: HttpService,
    private businessService: BusinessService,
    private addressService:AddressService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  async create(delivery: DeliveryDto): Promise<Delivery> {
    return this.deliveryRepository.create<Delivery>(delivery);
  }

  async findAll(filter: FindOptions) {
    return this.deliveryRepository.findAll(filter);
  }

  async findById(id: number): Promise<Delivery> {
    return this.deliveryRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.deliveryRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.deliveryRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.deliveryRepository.upsert(data);
  }

  async addNewPickupLocation(businessId:number){
    // const business = await this.businessService.findAll({where : { id : businessId}})
    const address = await this.addressService.findAll({where : { businessId } ,include:[{all: true}]})
    const user = await this.userService.findAll({ where : { businessId }})
    const body = {
      "pickup_location": address[0]['business']['name'],
      "name": address[0]['business']['name'],
      "email": user[0]['email'],
      "phone": user[0]['mobile'],
      "address": address[0]['name'],
      "city": address[0]['city'],
      "state":address[0]['state'],
      "country": address[0]['country'],
      "pin_code": address[0]['pinCode']
    }
    const token = await this.shipRocketLogIn()
    const options: AxiosRequestConfig = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    const url =this.configService.get('SHIP_ROCKET_API_URL');
    let res;
    try {
      res = await this.httpService.post(`${url}/settings/company/addpickup`,body, options).toPromise()
    } catch (error) {
      console.log(error);
    }
    return res
  }

  async checkCouirerServiceAvalabilty(orderId:number){
    const order = await this.orderService.findAll({where : {id :orderId },include:[{all: true}]});
    const pickUpAddress = await this.addressService.findAll({where : { businessId : order[0]['businessId']}})
    if(order && order.length){
        const url =this.configService.get('SHIP_ROCKET_API_URL')  
        const token = await this.shipRocketLogIn()
        const options: AxiosRequestConfig = {
          headers : {
            Authorization : `Bearer ${token}`
          },
          params : {
            pickup_postcode : pickUpAddress[0]['pinCode'],
            delivery_postcode: order[0]['address']['pinCode'],
            order_id: order[0]['shippingOrderId']
          }
        }     
        let res;
        try {
          res = await this.httpService.get(`${url}/courier/serviceability`,options).toPromise()
        } catch (error) {
          console.log(error);
        }
        return res.data
    }
  }

  async createcustomOrder(){

    const body = {
      "order_id": "9770514168",
      "order_date": "2021-09-06",
      "pickup_location": "Adixoo",
      "channel_id": "",
      "comment": "Reseller: Divine",
      "billing_customer_name": "Aditya ",
      "billing_last_name": "Shukla",
      "billing_address": "1203 sudhama nagar",
      "billing_address_2": "1203 sudhama nagar",
      "billing_city": "Indore",
      "billing_pincode": "452009",
      "billing_state": "Madhya Pradesh",
      "billing_country": "India",
      "billing_email": "aditya@gmail.com",
      "billing_phone": "9770514168",
      "shipping_is_billing": true,
      "shipping_customer_name": "",
      "shipping_last_name": "",
      "shipping_address": "",
      "shipping_address_2": "",
      "shipping_city": "",
      "shipping_pincode": "",
      "shipping_country": "",
      "shipping_state": "",
      "shipping_email": "",
      "shipping_phone": "",
      "order_items": [
        {
          "name": "chocolate",
          "sku": "cbs123",
          "units": 1,
          "selling_price": "1",
          "discount": "",
          "tax": "",
          "hsn": 44122
        }
      ],
      "payment_method": "COD",
      "shipping_charges":1 ,
      "giftwrap_charges":1 ,
      "transaction_charges": 1,
      "total_discount": "",
      "sub_total": 1,
      "length": 5,
      "breadth": 2,
      "height": 1,
      "weight": 0.005
    }
    const token = await this.shipRocketLogIn()
    const options: AxiosRequestConfig = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    const url =this.configService.get('SHIP_ROCKET_API_URL');
    let res;
    try {
      res = await this.httpService.post(`${url}/orders/create/adhoc`,body, options).toPromise()
    } catch (error) {
      console.log(error);
    }
    return res
  }

  async generateAWB(orderId){
    const order = await this.orderService.findAll({where : {id :orderId },include:[{all: true}]});
    const url =this.configService.get('SHIP_ROCKET_API_URL')  
    const token = await this.shipRocketLogIn()
    const options: AxiosRequestConfig = {
      headers : {
        Authorization : `Bearer ${token}`
      },
      params : {
        shipment_id: order[0]['shipmentId']
      }
    }     
    let res;
    try {
      res = await this.httpService.get(`${url}/courier/assign/awb`,options).toPromise()
    } catch (error) {
      console.log(error);
    }
    return res.data
  }

  async requestShipmentPickup(orderId){
    const order = await this.orderService.findAll({where : {id :orderId },include:[{all: true}]});
    const url =this.configService.get('SHIP_ROCKET_API_URL')  
    const token = await this.shipRocketLogIn()
    const options: AxiosRequestConfig = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }  
    const body =  {
      shipment_id: order[0]['shipmentId']
    }   
    let res;
    try {
      res = await this.httpService.post(`${url}/courier/generate/pickup`,body,options).toPromise()
    } catch (error) {
      console.log(error);
    }
    return res.data
  }

  async generateManifest(orderId){
    const order = await this.orderService.findAll({where : {id :orderId },include:[{all: true}]});
    const url =this.configService.get('SHIP_ROCKET_API_URL')  
    const token = await this.shipRocketLogIn()
    const options: AxiosRequestConfig = {
      headers : {
        Authorization : `Bearer ${token}`
      },
      params : {
        shipment_id: order[0]['shipmentId']
      }
    }  
    let res;
    try {
      res = await this.httpService.post(`${url}/manifests/generate`,{},options).toPromise()
    } catch (error) {
      console.log(error);
    }
    return res.data
  }

  async generateShipmentLabel(){
    
  }
  async shipRocketLogIn() {
    const body = {
        email : this.configService.get('SHIP_ROCKET_EMAIL'),
        password: this.configService.get('SHIP_ROCKET_PASSWORD')
    }
    const url =this.configService.get('SHIP_ROCKET_API_URL')
    let res;
    try {
      res = await this.httpService.post(`${url}/auth/login`,body).toPromise()
    } catch (error) {
      console.log(error);
    }
    return res.data.token
  }

}
