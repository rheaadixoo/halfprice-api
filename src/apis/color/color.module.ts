import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorRepository } from './color.repository';
import { ColorService } from './color.service';

@Module({
    imports: [],
    controllers: [ColorController],
    providers: [ColorRepository, ColorService],
    exports: [ColorService]
})
export class ColorModule { }
