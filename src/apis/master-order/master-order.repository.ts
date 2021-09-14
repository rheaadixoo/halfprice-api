import { MasterOrder } from './master-order.model';

export const MASTERORDER_REPOSITORY = 'MASTERORDER_REPOSITORY';

export const MasterOrderRepository = {
  provide: MASTERORDER_REPOSITORY,
  useValue: MasterOrder,
};
