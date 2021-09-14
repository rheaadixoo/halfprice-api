import { BadRequestException, Injectable } from '@nestjs/common';
import fs = require('fs');
import path = require('path');
import multer = require('multer');

@Injectable()
export class CanFileService {
  public getLocalStoredFilePath(file: any) {
    return path.join(file.destination, file.originalname);
  }

  private async removeTempFile(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, err => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  public async getFileBuffer(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // fs.readFile(filePath, (err,data) => {
      //   if (err) reject(err);
      //   resolve(data);
      // });
      resolve(fs.createReadStream(filePath))
    });
  }

  public async removeTempFiles(files: any[]): Promise<boolean> {
    // Remove Temp File
    let result = false;
    for (let file of files) {
      result = await this.removeTempFile(this.getLocalStoredFilePath(file));
    }
    return result;
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


  public validateFiles(files: any, maxLength: number, extension:string = '.csv') {
    if (files.length > maxLength || files.length == 0) {
      throw new BadRequestException('Multiple files are not allowed!');
    }
    for (let i = 0; i < files.length; i++) {
      if (!files[i].originalname.endsWith(extension)) {
        throw new BadRequestException(
          `Please upload a valid ${extension.split('.')[1]} file`,
        );
      }
    }
  }
}
