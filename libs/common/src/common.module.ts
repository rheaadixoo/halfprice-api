import { HttpModule, Module } from '@nestjs/common';
import { CanCommonService } from './common.service';
import { CanTextParserService } from './helpers/parser/text-parser.service';
import { CanPermissionModule } from './permissions/permissions.module';
import { CanExcelExportService } from './services';
import { CanFileService } from './services/files/file.service';
import { CanCsvParserService } from './services/parser/csv-parser.service';

@Module({
  providers: [
    CanCommonService,
    CanTextParserService,
    CanCsvParserService,
    CanFileService,
    CanExcelExportService,
  ],
  exports: [
    CanCommonService,
    CanPermissionModule,
    CanTextParserService,
    CanCsvParserService,
    CanFileService,
    CanExcelExportService,
  ],
  imports: [CanPermissionModule, HttpModule],
})
export class CanCommonModule {}
