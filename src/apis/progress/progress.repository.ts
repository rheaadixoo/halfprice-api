import { Progress } from './progress.model';

export const PROGRESS_REPOSITORY = 'PROGRESS_REPOSITORY';

export const ProgressRepository = {
  provide: PROGRESS_REPOSITORY,
  useValue: Progress,
};
