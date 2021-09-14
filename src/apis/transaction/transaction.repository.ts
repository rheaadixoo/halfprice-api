import { Transaction } from './transaction.model';

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export const TransactionRepository = {
  provide: TRANSACTION_REPOSITORY,
  useValue: Transaction,
};
