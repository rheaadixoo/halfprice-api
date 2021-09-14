import { CanExternalApiOptions } from "@can/common";


export const WHATSAPP_API_CONFIG: CanExternalApiOptions = {
  url: process.env.WHATSAPP_URL,
  headers:{
    'x-auth-token' :process.env.WHATSAPP_TOKEN,
    Host:process.env.WHATSAPP_HOST
  },
  method: 'post',
  data: {
    ttl: process.env.TTL,
    hsm: {
      namespace: process.env.NAMESPACE,
      language: {
        policy: process.env.WHATSAPP_POLICY,
        code: process.env.WHATSAPP_CODE
      },
    },
    template: {
      namespace: process.env.NAMESPACE,
      language: {
        policy: process.env.WHATSAPP_POLICY,
        code: process.env.WHATSAPP_CODE
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                filename: "FILENAME"
              }
            }
          ]
        }
      ]
    }
  },
  
};
