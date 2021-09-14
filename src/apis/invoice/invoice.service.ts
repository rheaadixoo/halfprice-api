import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { INVOICE_REPOSITORY } from './invoice.repository';
import { Invoice } from './invoice.model';
import { InvoiceDto } from './invoice.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { CartDetailsService } from '../cart-details/cart-details.service';
import { ConfigService } from '@nestjs/config';
import { PdfService } from 'src/common/services/pdf/pdf.service';
import { invoiceTemplate } from './invoice.template'
import { CanAwsService } from '@can/aws';
import { CartService } from '../cart/cart.service';
import { AddressService } from '../address/address.service';
import { BusinessService } from '../business/business.service';
import { any } from 'sequelize/types/lib/operators';
@Injectable()
export class InvoiceService {
  private BUCKET_NAME;
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: typeof Invoice,
    private cartDetailsService : CartDetailsService,
    private configService: ConfigService,
    private pdfService: PdfService,
    private awsService: CanAwsService,
    private cartService: CartService,
    private addressService: AddressService,
    private businessService: BusinessService

  ) {
    this.BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  async create(invoice: InvoiceDto): Promise<Invoice> {
    return this.invoiceRepository.create<Invoice>(invoice);
  }

  async findAll(filter: FindOptions) {
    return this.invoiceRepository.findAll(filter);
  }

  async findById(id: number): Promise<Invoice> {
    return this.invoiceRepository.findByPk(id);
  }

  async generateInvoice(cartId: number, businessId): Promise<any> {
    let billAmount = 0, totalQuantity = 0 ;
    const cartDetails = await this.cartDetailsService.findAll({where:{cartId, businessId},  include: [{ all: true }]})
    try {
    const invoiceItems: any[] = []
    for (let index = 0; index < cartDetails.length; index++) {
      invoiceItems.push({
        serial_number:cartDetails[index].product.hsnCode,
        name:cartDetails[index].product.name,
        description: cartDetails[index].product.description,
        quantity: cartDetails[index].quantity,
        unit_amount: cartDetails[index].product.sellingPrice,
        total_amount: cartDetails[index].product.sellingPrice * cartDetails[index].quantity

      })
      billAmount +=  cartDetails[index].product.sellingPrice * cartDetails[index].quantity;
      totalQuantity += cartDetails[index].quantity
    }

    const invoice = await this.invoiceRepository.create({invoiceItems, cartId, businessId});
    const carts = await this.cartService.findAll({where:{id : cartId},include: [{ all: true }]})
    const userAddress = await this.addressService.findAll({where : { userId : carts[0]['userId'] },include: [{ all: true }]})
    const business = await this.businessService.findById(businessId)
    const businessAddress = await this.addressService.findAll({where : {businessId}}) 
    const invoiceDetails = {
      invoice_number : invoice.invoiceNumber,
      order_uc_id : 'test',
      courier_code:' test',
      awb_number :'awb_number',
      bar_code_path: 'bar_code_path',
      invoice_date: invoice.invoiceDate,
      consignee_name: carts[0]['user']['name'],
      address: userAddress[0]['address'],
      city: userAddress[0]['city'],
      state_country: userAddress[0]['state'],
      phone: carts[0]['user']['mobile'],
      delivery_pin: userAddress[0]['pinCode'],
      courier_name: 'courier_name',
      process_code: 'process_code',
      bill_amount: billAmount,
      total_quantity: totalQuantity,
      supplier_city: businessAddress[0]['city'],
      supplier_state : businessAddress[0]['state'],
      supplier_pin_code: businessAddress[0]['pinCode'],
      reseller_first_name: business.name.split(' ')[0],
      reseller_last_name: business.name.split(' ').length &&  business.name.split(' ').length >=1 ? business.name.split(' ')[1]:'',
      items: invoiceItems
     }
     const invoiceUrl = await this.generateUrl(invoiceDetails)

     for (let index = 0; index < cartDetails.length; index++) {       
        this.cartDetailsService.updateById(cartDetails[index]['id'],{invoiceId : invoice.id})
     }
     await this.updateById(invoice.id,{invoiceUrl})
    } catch (error) {
      throw new UnprocessableEntityException(
        'Something went wrong :',error
      );
      
    }
  
    return {message: 'Successfully created'};
  }

  async generateUrl(details){
    try {
    const htmlTemplate =  invoiceTemplate(details);
    const pdfBuffer = await this.pdfService.getPDFBuffer(htmlTemplate)
    const uploadParams: any = {
      Bucket: this.BUCKET_NAME,
      Key: Date.now() + '_invoice_service',
      Body: pdfBuffer,
      ACL: 'public-read',
    };
    // Uploading to S3
    const resp = await this.awsService.uploadToS3(uploadParams);
    return resp.Location
    } catch (error) {
      console.log("Invoice generate Error : ",error);
      
      return null;
    }
    
  }
  async count(filter: CountOptions) {
    const totalCount = await this.invoiceRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.invoiceRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.invoiceRepository.upsert(data);
  }
}
