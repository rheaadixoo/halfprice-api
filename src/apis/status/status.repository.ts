import { Status } from './status.model';

export const STATUS_REPOSITORY = 'STATUS_REPOSITORY';

export const StatusRepository = {
  provide: STATUS_REPOSITORY,
  useValue: Status,
};
