import { Comments } from './comments.model';

export const COMMENTS_REPOSITORY = 'COMMENTS_REPOSITORY';

export const CommentsRepository = {
  provide: COMMENTS_REPOSITORY,
  useValue: Comments,
};
