import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const pdf = require('html-pdf');

@Injectable()
export class PdfService {
  private secret: string;

  constructor(private configService: ConfigService) {
   
  }

  /**
   * Create PDF Buffer
   * @param html
   */
   getPDFBuffer(html: string): Promise<any> {
    return new Promise((resolve, reject) => {
      /**
       * For Options
       * https://www.npmjs.com/package/html-pdf
       */
      const options = {
        "format": "A4",
        "orientation": "portrait",
        "border": {
          "top": "0.3in",
        },
      }
      // Create Buffer
      pdf.create(html, options).toBuffer(function (error: any, buffer: any) {
        if (error) {
          reject(new Error(error.message));
        }
        resolve(buffer);
      });
    })
  }
}
