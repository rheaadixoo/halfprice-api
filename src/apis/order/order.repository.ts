import { Order } from './order.model';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export const OrderRepository = {
  provide: ORDER_REPOSITORY,
  useValue: Order,
};
