import { Injectable } from '@nestjs/common';
import fs = require('fs');
import path = require('path');
import multer = require('multer');
import cloudinary = require('cloudinary');
import { ConfigService } from '@nestjs/config';



@Injectable()
export class CloudinaryFileUpload {

  public cloudinaryV2 = cloudinary.v2;
  constructor(
    private configService: ConfigService
  ){
    const CLOUD_NAME = this.configService.get('CLOUD_NAME'),
    API_KEY = this.configService.get('API_KEY'),
    API_SECRET = this.configService.get('API_SECRET')

    this.cloudinaryV2.config({ 
        cloud_name: CLOUD_NAME, 
        api_key: API_KEY, 
        api_secret: API_SECRET 
      });
  }
  
  public static getFilesStorage() {
    // Set File Storage Path
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './');
      },
      filename: function(req, file, cb) {
        cb(null, file.originalname);
      },
    });
    return storage;
  }

  // public uploadFileToCloudinary(filePath:string){
  //   return new Promise((resolve, reject) =>{
  //       this.cloudinaryV2.uploader.upload(filePath, (error, result) =>{
  //           if(error) {
  //               reject(error) ;
  //           }
  //           resolve(result)
  //         });
  //   })
  // }

  public uploadFileToCloudinary(file , resourceType){
    return new Promise((resolve, reject) =>{
      cloudinary.v2.uploader.upload_stream(resourceType, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(`Upload succeed: ${res}`);
          resolve(res);
        }
      }).end(file.buffer);
    })
  }
  public deleteFileFromCloudinary(name){
    return new Promise(async(resolve , reject) =>{
      try {      
       const result = await this.cloudinaryV2.uploader.destroy(name)
       resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

}
