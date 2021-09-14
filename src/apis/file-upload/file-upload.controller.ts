import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileUploadDto } from './file-upload.dto';
import { FileUploadService } from './file-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CanFileService } from '@can/common';

@Controller('files')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files'),
    )
  async create(
    @UploadedFiles() files,
    @Query('channel') channel: 's3'|'cloudinary',
  ) {
    if(channel){
      switch (channel) {
        case 's3':        
        return this.fileUploadService.uploadFileToS3(files);
        case 'cloudinary':        
          return this.fileUploadService.uploadFileToCloudinary(files); 
        default:
          throw new UnprocessableEntityException('Channel should be s3 or cloudinary');
      }
    }else{
      return this.fileUploadService.uploadFile(files)
    }
  }

  @Post('delete')
  @HttpCode(200)
  async delete(
    @Body(ValidationPipe) fileUploadDto: FileUploadDto,
    @Query('channel') channel: 's3'|'cloudinary'
    ) {
      if(channel){
        switch (channel) {
          case 's3':        
          return this.fileUploadService.deleteFromS3(fileUploadDto);
          case 'cloudinary':        
          return this.fileUploadService.deleteFromCloudinary(fileUploadDto) 
        default:
          throw new UnprocessableEntityException('Channel should be s3 or cloudinary');
        }
      }else{
      return this.fileUploadService.deleteFiles(fileUploadDto)
    }
  }
}
  