import { ContactUs } from './contact-us.model';

export const CONTACTUS_REPOSITORY = 'CONTACTUS_REPOSITORY';

export const ContactUsRepository = {
  provide: CONTACTUS_REPOSITORY,
  useValue: ContactUs,
};
