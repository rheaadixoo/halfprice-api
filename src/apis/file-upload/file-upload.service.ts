import { CanAwsService } from '@can/aws';
import { CanFileService } from '@can/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryFileUpload } from 'src/common/services/files/cloudinary.service';
import { FileUploadDto } from './file-upload.dto';

@Injectable()
export class FileUploadService {
  // Set S3 Bucket Name
  private BUCKET_NAME;
  
  constructor(
    private awsService: CanAwsService,
    private configService: ConfigService,
    private cloudinaryFileService:CloudinaryFileUpload
  ) {
    this.BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  public async uploadFileToS3(files: any): Promise<any> {
    return new Promise(async resolve => {
      // Store Upload Response
      const uploadedResponse: any = [];
      // Uplod Count
      let count = 0;
      // Uploading Files
      files.forEach(async (file: any) => {
        // Set Upload Params
        const uploadParams: any = {
          Bucket: this.BUCKET_NAME,
          Key: Date.now() + '_' + file['originalname'],
          Body: file['buffer'],
          ACL: 'public-read',
          ContentType: file['mimetype'],
        };

        if (file['mimetype'] === 'application/pdf') {
          uploadParams['ContentType'] = 'application/pdf';
          uploadParams['ContentDisposition'] = 'inline';
        }

        // Uploading to S3
        const resp = await this.awsService.uploadToS3(uploadParams);
        // Store Response
        uploadedResponse.push({ name: resp.Key, path: resp.Location });
        // Increment Upload Count
        count++;
        // Resolve Promise
        if (count === files.length) {
          resolve({ files: uploadedResponse });
        }
      });
    });
  }


  public async uploadFile(files): Promise<any> {
    return new Promise(async resolve => {
      // Store Upload Response
      const uploadedResponse: any = [];
      // Uplod Count
      let count = 0;
      // Uploading Files
      files.forEach(async (file: any) => {      
        if (file['mimetype'].includes('image') || this.isImageType(file['originalname'])) {  
        
          // Uploading to Cloudinary
          const resp :any= await this.cloudinaryFileService.uploadFileToCloudinary(file,{resource_type :'image'});
          // Store Response
          uploadedResponse.push({ name: resp.public_id, path: resp.secure_url });
          // Increment Upload Count
        }else{
          // Set Upload Params
        const uploadParams: any = {
          Bucket: this.BUCKET_NAME,
          Key: Date.now() + '_' + file['originalname'],
          Body: file['buffer'],
          ACL: 'public-read',
          ContentType: file['mimetype'],
        };

        if (file['mimetype'] === 'application/pdf') {
          uploadParams['ContentType'] = 'application/pdf';
          uploadParams['ContentDisposition'] = 'inline';
        }

        // Uploading to S3
        const resp = await this.awsService.uploadToS3(uploadParams);
        // Store Response
        uploadedResponse.push({ name: resp.Key, path: resp.Location });
        }
        count++;
        // Resolve Promise
        if (count === files.length) {
          resolve({ files: uploadedResponse });
        }
      });
    });
  }
  public isImageType(fileName){
    const imageExtension = ['jpg','jpeg','png']
    return imageExtension.includes(fileName.split('.')[fileName.split('.').length - 1].toLowerCase())? true:false
  }
  public async uploadFileToCloudinary(files: any): Promise<any> {
    return new Promise(async resolve => {
      // Store Upload Response
      const uploadedResponse: any = [];
      // Uplod Count
      let count = 0;
      // Uploading Files
      files.forEach(async (file: any) => {      

        const resourceType = {}
        if (this.isImageType(file['originalname'])) {
          resourceType['resource_type'] = 'image'
        }else{
          resourceType['resource_type'] = 'raw'
        }
        // Uploading to Cloudinary
        const resp :any= await this.cloudinaryFileService.uploadFileToCloudinary(file,resourceType);
        // Store Response
        uploadedResponse.push({ name: resp.public_id, path: resp.secure_url });
        // Increment Upload Count
        count++;
        // Resolve Promise
        if (count === files.length) {
          resolve({ files: uploadedResponse });
        }
      });
    });
  }

  public async deleteFromCloudinary(fileUploadDto: FileUploadDto){
    return new Promise(resolve => {
      // Store Delete Response
      const deletedResponse: any = [];
      // delete Count
      let count = 0;
      fileUploadDto.paths.forEach(async path => {
        const splittedPath = path.split('/');
        const fileName = splittedPath[splittedPath.length - 1].replace(
          new RegExp(/%20/gim),
          ' ',
        );
      const key = fileName.split('.')[fileName.split('.').length - 2]
       await this.cloudinaryFileService.deleteFileFromCloudinary(key);
        
        // Store Response
        deletedResponse.push(path);
        // Increment Upload Count
        count++;
        // Resolve Promise
        if (count === fileUploadDto.paths.length) {
          resolve({ files: deletedResponse });
        }
      });
    });
  }

  public async deleteFiles(fileUploadDto: FileUploadDto){
    return new Promise(resolve => {
      // Store Delete Response
      const deletedResponse: any = [];
      // delete Count
      let count = 0;
      fileUploadDto.paths.forEach(async path => {
        const splittedPath = path.split('/');
          const fileName = splittedPath[splittedPath.length - 1].replace(
            new RegExp(/%20/gim),
            ' ',
          );
        const key = fileName.split('.')[fileName.split('.').length - 2]
        if(this.isImageType(fileName)){
          try {
            await this.cloudinaryFileService.deleteFileFromCloudinary(key);
          } catch (error) {
            return error;
          }
        }else{
          await this.awsService.deleteFromS3({
            Bucket: this.BUCKET_NAME,
            Key: key,
          });
        }
        
        // Store Response
        deletedResponse.push(path);
        // Increment Upload Count
        count++;
        // Resolve Promise
        if (count === fileUploadDto.paths.length) {
          resolve({ files: deletedResponse });
        }
      });
    });
  }

  public async deleteFromS3(fileUploadDto: FileUploadDto): Promise<any> {
    return new Promise(resolve => {
      // Store Delete Response
      const deletedResponse: any = [];
      // delete Count
      let count = 0;
      fileUploadDto.paths.forEach(async path => {
        const splittedPath = path.split('/');
        const key = splittedPath[splittedPath.length - 1].replace(
          new RegExp(/%20/gim),
          ' ',
        );
        await this.awsService.deleteFromS3({
          Bucket: this.BUCKET_NAME,
          Key: key,
        });
        // Store Response
        deletedResponse.push(key);
        // Increment Upload Count
        count++;
        // Resolve Promise
        if (count === fileUploadDto.paths.length) {
          resolve({ files: deletedResponse });
        }
      });
    });
  }
}
