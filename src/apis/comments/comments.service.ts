import { Injectable, Inject } from '@nestjs/common';
import { COMMENTS_REPOSITORY } from './comments.repository';
import { Comments } from './comments.model';
import { CommentsDto } from './comments.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENTS_REPOSITORY) private readonly commentsRepository: typeof Comments
  ) {}

  async create(comments: CommentsDto): Promise<Comments> {
    return this.commentsRepository.create<Comments>(comments);
  }

  async findAll(filter: FindOptions) {
    return this.commentsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Comments> {
    return this.commentsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.commentsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.commentsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.commentsRepository.upsert(data);
  }
}
