import { Injectable, Inject } from '@nestjs/common';
import { CATELOUGE_REPOSITORY } from './catelouge.repository';
import { Catelouge } from './catelouge.model';
import { CatelougeDto } from './catelouge.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { CanAwsService } from '@can/aws';
import { ConfigService } from '@nestjs/config';
import { ProductService } from '../product/product.service';
import * as _ from 'lodash';


@Injectable()
export class CatelougeService {
   // Set S3 Bucket Name
   private BUCKET_NAME;
  constructor(
    @Inject(CATELOUGE_REPOSITORY) private readonly catelougeRepository: typeof Catelouge,
    private awsService: CanAwsService,
    private configService: ConfigService,
    private productService: ProductService
  ) {
    this.BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');

  }

  async create(catelouge: CatelougeDto): Promise<Catelouge> {
    return this.catelougeRepository.create<Catelouge>(catelouge);
  }

  async findAll(filter: FindOptions) {
    return this.catelougeRepository.findAll(filter);
  }

  async upload(catelouge: CatelougeDto): Promise<Catelouge> {
    const products = await this.awsService.getObject({Bucket: this.BUCKET_NAME, Key:catelouge.csvUrl.name})
    
    catelouge.csv = catelouge.csvUrl.path
    this.createBulk(products,catelouge.subCategoryId,catelouge.businessId)
    return this.catelougeRepository.create<Catelouge>(catelouge);
  }

  async createBulk(products, subCategoryId,businessId){
    for (let index = 0; index < products.length; index++) {
      const images  = []
      // if(products[index]["Image 1 URL"] && products[index]["Image 1 URL"].length){
      //   images.push(products[index]["Image 1 URL"])
      // }
      // if(products[index]["Image 2 URL"] && products[index]["Image 2 URL"].length){
      //   images.push(products[index]["Image 2 URL"])
      // }
      // if(products[index]["Image 3 URL"] && products[index]["Image 3 URL"].length){
      //   images.push(products[index]["Image 3 URL"])
      // }
      // if(products[index]["Image 4 URL"] && products[index]["Image 4 URL"].length){
      //   images.push(products[index]["Image 4 URL"])
      // }
      // if(products[index]["Image 5 URL"] && products[index]["Image 5 URL"].length){
      //   images.push(products[index]["Image 5 URL"])
      // }
      const specifications = {}
      const keys = Object.keys(products[index]);
      for (let j = 0; j < keys.length; j++) {
        let key = keys[j];
        if(key && key.includes('specification')){
          console.log(key.toString())
          specifications[key.split(":")[1].trim()] = products[index][key.toString()]
      }      
      }
      const product : any= {
        'name':products[index]["name"], 
        'sku': products[index]["sku"],
        'description' : products[index]["description"],
        'price' : products[index]["price"],
        'sellingPrice' : products[index]["sellingPrice"],
        'thumbImages' : products[index]["thumbImages"],
        'images' : products[index]['images'].split(","),
        'hsnCode' : products[index]["hsnCode"],
        'materialCare': products[index]["materialCare"],
        'brandName' : products[index]["brand"],
        'specifications' : specifications,
        'availableStock' : products[index]["availableStock"],
        'subCategoryId': subCategoryId,
        'businessId' : businessId,
      }
      await this.productService.create(product)
    }
  }

  async findById(id: number): Promise<Catelouge> {
    return this.catelougeRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.catelougeRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.catelougeRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.catelougeRepository.upsert(data);
  }
}
