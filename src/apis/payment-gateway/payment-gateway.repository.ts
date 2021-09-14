import { PaymentGateway } from './payment-gateway.model';

export const PAYMENTGATEWAY_REPOSITORY = 'PAYMENTGATEWAY_REPOSITORY';

export const PaymentGatewayRepository = {
  provide: PAYMENTGATEWAY_REPOSITORY,
  useValue: PaymentGateway,
};
