import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ContactUsDto } from './contact-us.dto';
import { ContactUsService } from './contact-us.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('contact-uses')
export class ContactUsController { 
    constructor(private contactUsService: ContactUsService) {}

    @Post()
    async create(@Body(ValidationPipe) contactUsDto: ContactUsDto) {
        return this.contactUsService.create(contactUsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.contactUsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.contactUsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.contactUsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) contactUsDto: ContactUsDto,
    ) {
        return this.contactUsService.updateById(id, contactUsDto);
    }
}