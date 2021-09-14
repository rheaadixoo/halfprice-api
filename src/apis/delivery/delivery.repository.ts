import { Delivery } from './delivery.model';

export const DELIVERY_REPOSITORY = 'DELIVERY_REPOSITORY';

export const DeliveryRepository = {
  provide: DELIVERY_REPOSITORY,
  useValue: Delivery,
};
