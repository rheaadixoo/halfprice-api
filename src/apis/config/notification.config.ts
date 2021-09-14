import { CanNotificationOptions } from '@can/notification';
import { AWS_CONFIG } from './aws.config';
import { SMS_API_CONFIG, SMS_TEMPLATE_API_CONFIG } from './sms.config';
import { WHATSAPP_API_CONFIG } from './whatsapp.config';

export const NOTIFICATION_CONFIG: CanNotificationOptions[] = [
  {
    category: 'Users',
    items: [
      {
        trigger: {
          name: 'NEW_CONSUMER_CREATED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          applicationUrl: process.env.APPLICATION_URL,
          webUrl: process.env.WEB_URL,
          title: `Welcome to {{platformName}}!`,
          body: `
          Welcome to {{platformName}}! 
          We're your one-stop solution for making your home move-in ready. 
          We offer a complete hassle-free experience covering product orders, 
          speedy delivery and efficient installation.
                `,
          firstName: null,
          url:null
        },
        
        email: [
          {
            channel: 'aws',
            subject: 'Welcome to {{platformName}}!',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/new-user-created.hbs',
            },
          },
        ],
        sms: [
          {
            channel: 'api',
            message: `Welcome to {{platformName}} family! Here at {{platformName}} we aim to connect you to the best printing suppliers in your vicinity. Get started now! {{applicationUrl}}`,
            mobile: null,
            api: SMS_API_CONFIG,
            smsGateway:'msg91',
            type:'default'
            
          },
        ],
      },
      {
        trigger: {
          name: 'VERIFICATION_CODE',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          applicationUrl: process.env.APPLICATION_URL,
          webUrl: process.env.WEB_URL,         
          firstName: null,
          url:null,
          whatsappData:null
        },
        whatsapp:[
          {
            type:'hsm',
            mobile:null,
            api:WHATSAPP_API_CONFIG,
            data:null,
            whatsappGateway:'yellow-messenger'
          }
        ]
      },
      {
        trigger: {
          name: 'NEW_VENDOR_CREATED',
        },
        data: { 
          platformName: process.env.PLATFORM_NAME,
          applicationUrl: process.env.APPLICATION_URL,
          webUrl: process.env.WEB_URL,
          title: `Welcome to {{platformName}}!`,
          body: `
                    <strong>Hey {{firstName}},</strong>
                    <br>Welcome to {{platformName}} family! Here at {{platformName}} we aim to help you connect with individual customers as well as business seeking printing services near you. Our seamless and open system will help you expand your reach and get new customers. Just put in your quotations for the jobs you receive and we will keep you posted if you win a bid. 
                    Explore now! Just head over to our portal and set a new password to access your FREE account.
                    Happy printing!
                    <br><br>
                    Team {{platformName}}
                `,
          firstName: null,
        },
        email: [
          {
            channel: 'aws',
            subject: 'Welcome to {{platformName}}!',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
        sms: [
          {
            channel: 'api',
            message: `Welcome to {{platformName}} family! Our seamless and open system will help you expand your reach and get new customers. Just put in your quotations for the jobs you receive and we will keep you posted if you win a bid.`,
            mobile: null,
            api: SMS_API_CONFIG,
            smsGateway:'msg91',
            type:'default'

          },
        ],
      },
      {
        trigger: {
          name: 'NEW_ADMIN_CREATED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          applicationUrl: process.env.APPLICATION_URL,
          webUrl: process.env.WEB_URL,
          title: `Welcome to {{platformName}}!`,
          body: `
          Welcome to {{platformName}}! 
          We're your one-stop solution for making your home move-in ready. 
          We offer a complete hassle-free experience covering product orders, 
          speedy delivery and efficient installation.
          <br>
          <br>
          Just head over to our admin and set a new password.
                `,
          firstName: null,
          url:null
        },
        email: [
          {
            channel: 'aws',
            subject: 'Welcome to {{platformName}}!',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/new-admin-created.hbs',
            },
          },
        ],
        sms: [
          {
            channel: 'api',
            message: `Welcome to {{platformName}} family! Our seamless and open system will help you expand your reach and get new customers. Just put in your quotations for the jobs you receive and we will keep you posted if you win a bid.`,
            mobile: null,
            api: SMS_API_CONFIG,
            smsGateway:'msg91',
            type:'default'
          },
        ],
      },
     
      {
        trigger: {
          name: 'FORGOT_PASSWORD',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: 'Reset your password',
          body: `
          Please copy paste this link in your browser if you are having problems in accessing via the button above 
                `,
          firstName: null,
          url: null,
        },
        email: [
          {
            channel: 'aws',
            subject: 'Reset password request | {{platformName}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/forget-password.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'RESET_PASSWORD_SUCCESSFUL',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: 'Reset your password',
          body: `
          Your password to access {{platformName}} has changed. Please reset it to a new one in case you have not
          initiated
                `,
          firstName: null,
          url:null
        },
        email: [
          {
            channel: 'aws',
            subject: 'Your password has changed | {{platformName}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/reset-password-successful.hbs'
            },
          },
        ],
      },
    ],
  },
  {
    category: 'Orders',
    items: [
      {
        trigger: {
          name: 'NEW_ORDER_PLACED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: `Order has been placed`,
          body: null,
          firstName: null,
          jobId: null
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Order has been placed | JOB #{{jobId}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/new-order-placed.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_UPDATE',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: `{{orderId}} - {{newStatus}} `,
          body: ` {{images}}`,
          firstName: null,
          orderId: null,
          representativeName:null,
          newStatus:null,
          message: null,
          images:null,
          text:null
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} has an update for your Order # {{orderId}} | {{newStatus}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/order-update.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'REPRESENTATIVE_ASSIGNED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: `Representative Assigned`,
          body: `
                    <strong>Hi {{firstName}},</strong>
                    <br>{{platformName}} representative has been assigned for your order #{{orderId}}. Here are the contact details.
                    <br>Contact Info:
                    <br>Name : {{repName}}
                    <br>Mobile : {{repNumber}}
                    <br><br>
                    Team {{platformName}}
                `,
          firstName: null,
          orderId: null,
          repName: null,
          repNumber: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Representative assigned for your Order # {{orderId}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/representative-assinged.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PRINTING_STARTED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `Printing Started`,
          body: `
                   <strong>Hi {{firstName}},</strong>
                   <br>Printing started for Job #{{jobId}}.
                   <br><br>
                   Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Printing started for your JOB #{{jobId}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PRINTING_COMPLETED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `Printing Completed`,
          body: `
                   <strong>Hi {{firstName}},</strong>
                   <br>Printing completed for Job #{{jobId}}.
                   <br><br>
                   Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Printing completed for your JOB #{{jobId}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'DISPATCHED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `Order Dispatched`,
          body: `
                    <strong>Hi {{firstName}},</strong>
                    <br>Prints dispatched Job #{{jobId}}.
                    <br><br>
                    Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Dispatch confirmation for your JOB #{{jobId}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'DELIVERED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `Delivery completed`,
          body: `
                   <strong>Hi {{firstName}},</strong>
                   <br>Delivery completed for Job #{{jobId}}.
                   <br><br>
                   Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Delivery confirmation for your JOB #{{jobId}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'CANCELLED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `Job Cancelled`,
          body: `
                   <strong>Hi {{firstName}},</strong>
                   <br>Job #{{jobId}} has been cancelled.
                   <br><br>
                   Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject: '{{platformName}} | Your JOB #{jobId}} has been cancelled',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'VENDOR_VENDOR_ASSIGNED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `New Quote request`,
          body: `
                   <strong>Hi {{firstName}},</strong>
                   <br>Congratulations! you have been invited to submit a bid for job #{{jobId}}
                   <br><br>
                   Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | New quotation request for printing job',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'VENDOR_VENDOR_SELECTED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `Congratulations`,
          body: `
                   <strong>Hi {{firstName}},</strong>
                   <br>Congratulations! you have been selected for job #{{jobId}}
                   <br><br>
                   Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Congratulations! your bid has been selected for Job #{{jobId}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'VENDOR_VENDOR_CANCELLED',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068265_printer.png`,
          title: `Job Cancelled`,
          body: `
                   <strong>Hi {{firstName}},</strong>
                   <br>Job #{{jobId }} has been cancelled.
                   <br><br>
                   Team {{platformName}}
                `,
          firstName: null,
          jobId: null,
        },
        email: [
          {
            channel: 'aws',
            subject:
              '{{platformName}} | Your JOB # {{jobId}} has been cancelled',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_DISPATCHED_NEW',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068263_contact-form.png`,
          title: `The order is dispached and delivery date is shared`,
          orderNumber:null,
          date :null,
          whatsappData:null
        },
        sms: [
          {
            channel: 'api',
            message: `Your order {{orderNumber}} has been dispached and our Occupi expert will share the delivery details with you shortly.
            `,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            type:'template',
            templateId:'1307161587671607647',
            smsGateway:'msg91'
          },
        ],
        whatsapp:[
          {
            type:'hsm',
            mobile:null,
            api:WHATSAPP_API_CONFIG,
            data:null,
            whatsappGateway:'yellow-messenger'
          }
        ]
      },
      {
        trigger: {
          name: 'DELIVERY_HANDOVER',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068263_contact-form.png`,
          title: `Order is delivered, key handover and installation process is initiated`,
          name:null
        },
        sms: [
          {
            channel: 'api',
            message: `Your order has arrived & our Occupi expert will reach out to you for taking the keys to initiate installation.
            `,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            type:'template',
            templateId:'1307161587673374867',
            smsGateway:'msg91'
          },
        ],
        whatsapp:[{
          mobile:null,
          type:'hsm',
          api:WHATSAPP_API_CONFIG,
          whatsappGateway:'yellow-messenger'
        }]
      },
      // {
      //   trigger: {
      //     name: 'DELIVERY_HANDOVER_WITHOUT_REPRESENTATIVE',
      //   },
      //   data: {
      //     platformName: process.env.PLATFORM_NAME,
      //     webUrl: process.env.WEB_URL,
      //     icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068263_contact-form.png`,
      //     title: `Order is delivered, key handover and installation process is initiated`,
      //     name:null
      //   },
      //   sms: [
      //     {
      //       channel: 'api',
      //       message: `Your order has arrived & our Occupi expert will reach out to you for taking the keys to initiate installation.
      //       `,
      //       mobile: null,
      //       api: SMS_API_CONFIG,
      //     },
      //   ],
      // },
      {
        trigger: {
          name: 'INSTALLATION_START_PIC',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: `Installation process is initiated`,
          name:null,
          link:`https://occupi.in/Cover_image_occupi_copy.bb10105beed8da10f5f6.jpg`,
          type: "media-notification",
          mime: "image/png",
        },
        sms: [
          {
            channel: 'api',
            message: `We have begun the installation process! Our Occupi expert is on-site finishing for your apartment. - Team Occupi
            `,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            type:'template',
            templateId:'1307161587649760082',
            smsGateway:'msg91'
          },
        ],
        whatsapp:[{
          mobile:null,
          type:'template',
          api:WHATSAPP_API_CONFIG,
          whatsappGateway:'yellow-messenger'
        }]
      },
      {
        trigger: {
          name: 'JOB_COMPLETE',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          title: `Installation & Handover`,
          name:null,
        },
        sms: [
          {
            channel: 'api',
            message: `We have got news for you. Congratulations, Your home is now move-in ready! Our expert will handover the keys to the estate manager. - Team Occupi`,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            type:'template',
            templateId:'1307161563408540037',
            smsGateway:'msg91'
          },
        ],
        whatsapp:[
          {
            mobile:null,
            type:'hsm',
            api:WHATSAPP_API_CONFIG,
            whatsappGateway:'yellow-messenger'
          }
        ]
      },
    ],
  },
  {
    category: 'Payment',
    items: [
      {
        trigger: {
          name: 'PAYMENT_SUCCESS',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: `Payment Received - Rs.{{amount}} `,
          body: `
          We have received payment of Rs.{{amount}} towards your Order id {{orderNumber}}
                `,
          firstName: null,
          orderNumber: null,
          amount: null
        },
        email: [
          {
            channel: 'aws',
            subject:
              'Payment received for your Order # {{orderNumber}}',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                  'src/browser/views/templates/email/payment-success.hbs'
            },
          },
        ],
        
      },
      {
        trigger: {
          name: 'PAYMENT_LINK',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068263_contact-form.png`,
          title: `Payment Link Generated `,
          body: `
                  
                    Your payment is pending
                    <br>
                    <br>
                    <br>
                    <table align="center" bgcolor="#1264AD" cellpadding="0" cellspacing="0"
                    style="margin: 0 auto; border-radius: 4px;">
                    <tr>
                      <th>
                        <a href="{{url}}"
                          style="border-radius: 4px; color: #FFFFFF; display: inline-block; font-size: 14px; padding: 13px 25px; text-decoration: none; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);">Pay Now
                        </a>
                      </th>
                    </tr>
                  </table>
                   
                `,
          firstName: null,
          url :null,
          orderNumber:null,
          orderAmount:null
        },
        email: [
          {
            channel: 'aws',
            subject:
              'Payment Link is generated',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
              'src/browser/views/templates/email/payment-success.hbs',
            },
          },
        ],

        sms: [
          {
            channel: 'api',
            message: `Hello {{firstName}} , Please click here - {{url}} to pay the amount of Rs. {{orderAmount}} for your Occupi Order ID - {{orderNumber}}`,
            // `Hello {{firstName}} , Please click here - {{url}} to pay the amount of Rs.{{orderAmount}} for your Occupi Order ID - {{orderNumber}}.`,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            smsGateway:'msg91',
            type:'template',
            templateId:'1307161778268003153'
          },
        ],
        whatsapp:[ {
          type :'hsm',
          mobile:null,
          api:WHATSAPP_API_CONFIG,
          whatsappGateway:'yellow-messenger'
        }]
       
        
      },
      {
        trigger: {
          name: 'PAYMENT_SUCCESS_ONLINE_NEW',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068263_contact-form.png`,
          title: `Successful online payment & confirmation of the order`,
          body: `
                  
                    Your payment is pending
                    <br>
                    <br>
                    <br>
                    <table align="center" bgcolor="#1264AD" cellpadding="0" cellspacing="0"
                    style="margin: 0 auto; border-radius: 4px;">
                    <tr>
                      <th>
                        <a href="{{url}}"
                          style="border-radius: 4px; color: #FFFFFF; display: inline-block; font-size: 14px; padding: 13px 25px; text-decoration: none; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);">Pay Now
                        </a>
                      </th>
                    </tr>
                  </table>
                   
                `,
          amount: null,
          orderNumber: null,
          name:null,
          url :null,
          whatsappData:null
        },
        sms: [
          {
            channel: 'api',
            message: `Hurray! We have received your payment of INR {{amount}} and order {{orderNumber}} has been confirmed. Our Occupi expert will call you within 24 hours.
            `,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            type:'template',
            templateId:'1307161587681209446',
            smsGateway:'msg91'
          },
        ],
        whatsapp:[
          {
            mobile:null,
            type:'hsm',
            api:WHATSAPP_API_CONFIG,
            data:null,
            whatsappGateway:'yellow-messenger'

          }
        ]
      },
      {
        trigger: {
          name: 'PAYMENT_FAILED_ONLINE',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068263_contact-form.png`,
          title: `An online payment that failed`,
          name:null,
          url :null
        },
        sms: [
          {
            channel: 'api',
            message: `Oops! your payment failed. Any amount deducted will be refunded within 3-4 working days. Team Occupi.`,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            type:'template',
            templateId:'1307161587682566839',
            smsGateway:'msg91'
          },
        ],
        whatsapp:[
          {
            mobile:null,
            type:'hsm',
            api:WHATSAPP_API_CONFIG,
            whatsappGateway:'yellow-messenger'
          }
        ]
      },
      {
        trigger: {
          name: 'PAYMENT_SUCCESS_OFFLINE_NEW',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          icon: `https://print-now-consumer.s3.ap-south-1.amazonaws.com/1610986068263_contact-form.png`,
          title: `Successful payment & confirmation of the order`,
          orderNumber:null,
          amount :null,
          whatsappData:null
        },
        sms: [
          {
            channel: 'api',
            message: `Hurray! We’ve received your payment of INR {{amount}} and order {{orderNumber}} has been confirmed. Our Occupi expert will call you within 24 hours.
            `,
            mobile: null,
            api: SMS_TEMPLATE_API_CONFIG,
            smsGateway:'msg91',
            type:'template',
            templateId:'1307161725816156054'
          },
        ],
        whatsapp:[
          {
            mobile:null,
            type:'hsm',
            api:WHATSAPP_API_CONFIG,
            whatsappGateway:'yellow-messenger'
          }
        ]
      },
    ],
  },
  {
    category: 'Others',
    items: [
      {
        trigger: {
          name: 'INCORRECT_DATA',
        },
        data: {
          platformName: process.env.PLATFORM_NAME,
          webUrl: process.env.WEB_URL,
          title: `Incorrect CSV for package details`,
          csv:null,
          body:'Incorrect CSV uploaded for package details on {{platformName}}, Please try again!'
        },
        email: [
          {
            channel: 'aws',
            subject:
              'CSV Uploading Failed',
            from: process.env.EMAIL_FROM,
            aws: AWS_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/browser/views/templates/email/default.hbs',
            },
            attachments:[{
              filename: null,
              raw:null
            }            
            ]
          },
        ],    
      },
    ],
  },
];
