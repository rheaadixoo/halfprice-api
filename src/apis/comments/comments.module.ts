import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
    imports: [],
    controllers: [CommentsController],
    providers: [CommentsRepository, CommentsService],
    exports: [CommentsService]
})
export class CommentsModule { }
