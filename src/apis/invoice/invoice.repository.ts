import { Invoice } from './invoice.model';

export const INVOICE_REPOSITORY = 'INVOICE_REPOSITORY';

export const InvoiceRepository = {
  provide: INVOICE_REPOSITORY,
  useValue: Invoice,
};
