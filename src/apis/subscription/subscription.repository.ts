import { Subscription } from './subscription.model';

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY';

export const SubscriptionRepository = {
  provide: SUBSCRIPTION_REPOSITORY,
  useValue: Subscription,
};
