import { Injectable, Inject } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from './product.repository';
import { Product } from './product.model';
import { ProductDto, ProductStatusDto } from './product.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { CanCsvParserService, CanCurrentUser, CanFileService } from '@can/common';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    private fileService: CanFileService,
    private csvParserService: CanCsvParserService,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    return this.productRepository.create<Product>(product);
  }

  async upload(files:any , user:CanCurrentUser): Promise<any> {
    this.fileService.validateFiles(files, 1, '.csv');
    const products = await this.csvParserService.parseLocalCSVToJSON<
      any[]
    >(this.fileService.getLocalStoredFilePath(files[0]));
    this.createBulk(products)
    console.log(files , user);
    
    return {message :"Product will uploaded soon"};
  }

  async createBulk(products){
    for (let index = 0; index < products.length; index++) {
      const images  = []
      if(products[index]["Image 1 URL"] && products[index]["Image 1 URL"].length){
        images.push(products[index]["Image 1 URL"])
      }
      if(products[index]["Image 2 URL"] && products[index]["Image 2 URL"].length){
        images.push(products[index]["Image 2 URL"])
      }
      if(products[index]["Image 3 URL"] && products[index]["Image 3 URL"].length){
        images.push(products[index]["Image 3 URL"])
      }
      if(products[index]["Image 4 URL"] && products[index]["Image 4 URL"].length){
        images.push(products[index]["Image 4 URL"])
      }
      if(products[index]["Image 5 URL"] && products[index]["Image 5 URL"].length){
        images.push(products[index]["Image 5 URL"])
      }
      const specifications = []
      const product : any= {
        'name':products[index]["Product Name"], 
        'sku': products[index]["SKU ID"],
        'description' : products[index]["Description"],
        'price' : products[index]["Maximum Retail Price (Rs"],
        'sellingPrice' : products[index]["Selling Price (Rs"],
        'thumbImages' : products[index]["Image 1 URL"],
        'images' : images,
        'hsnCode' : products[index]["HSN Code"],
        'materialCare': products[index]["Material Care"],
        'brandName' : products[index]["Brand"],
        'specifications' : specifications,
        'availableStock' : 5,
        'subCategoryId': products[index]["subCategoryId"],
        'businessId' : 1,
      }
      await this.create(product)
    }
  }

  async statusUpdate(productStatus : ProductStatusDto){
    if(productStatus.allStatus && productStatus.allStatus.length){
      this.updateBusinessProduct(productStatus)
      return {message : 'Products will update soon!'}

    }else{
      if(productStatus.approved){
        for (let index = 0; index < productStatus.approved.length; index++) {
          this.updateById(productStatus.approved[index],{productStatus:'approved'})
        }
      }
      if(productStatus.rejected){
        for (let index = 0; index < productStatus.rejected.length; index++) {
          this.updateById(productStatus.rejected[index],{productStatus:'rejected'})
        }
      }
    }
    return {message : 'Products will update soon!'}
  }

  async updateBusinessProduct(productStatus : ProductStatusDto){
    const products = await this.findAll({where:{productStatus :'pending', businessId:productStatus.businessId}});
    for (let index = 0; index < products.length; index++) {
      await this.updateById(products[index]['id'],{productStatus : productStatus.allStatus})
    }
  }
  async findAll(filter: FindOptions) {
    return this.productRepository.findAll(filter);
  }

  async findById(id: number): Promise<Product> {
    return this.productRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.productRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.productRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.productRepository.upsert(data);
  }
}
