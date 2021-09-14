import { CanExternalApiOptions } from '@can/common';

export const SMS_API_CONFIG: CanExternalApiOptions = {
  url: process.env.SMS_URL,
  method: 'GET',
  params: {
    authkey: process.env.SMS_AUTH_KEY,
    country: process.env.SMS_COUNTRY,
    sender: process.env.SMS_SENDER,
    route: process.env.SMS_ROUTE,
  },
};

export const SMS_TEMPLATE_API_CONFIG: CanExternalApiOptions = {
  url: process.env.SMS_TEMPLATE_URL,
  method: 'post',
  data:{
    country: process.env.SMS_COUNTRY,
    sender: process.env.SMS_SENDER,
    route: process.env.SMS_ROUTE,
    unicode:process.env.UNICODE,
  },
  headers:{
    authkey:process.env.SMS_AUTH_KEY
  }
};
