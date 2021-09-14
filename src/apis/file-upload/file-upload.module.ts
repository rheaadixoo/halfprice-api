import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CloudinaryFileUpload } from 'src/common/services/files/cloudinary.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [CommonModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryFileUpload],
  exports: [FileUploadService],
})
export class FileUploadModule {}
