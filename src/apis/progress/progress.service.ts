import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PROGRESS_REPOSITORY } from './progress.repository';
import { Progress } from './progress.model';
import { ProgressDto } from './progress.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { OrderService } from '../order/order.service';
import { CanNotificationService } from '@can/notification';
import { UserService } from 'src/core/user/user.service';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment'

@Injectable()
export class ProgressService {
  constructor(
    @Inject(PROGRESS_REPOSITORY)
    private readonly progressRepository: typeof Progress,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private notificationService: CanNotificationService,
    private userService: UserService,
    private configService: ConfigService,

  ) {}

  async create(progress: ProgressDto): Promise<Progress> {
    const createdProgress = await this.progressRepository.create<Progress>(
      progress,
    );
    const order = await this.orderService.findById(progress.orderId)
    switch (progress.progress.toLowerCase().trim()) {
      case 'goods in transit':
          const data = {
            orderNumber :order.orderNumber,
          date : moment().add(7,'days').format('DD MMM YYYY')
          },whatappData = [{
            default: order.orderNumber,
          }]

          this.triggerNotification(progress,'ORDER_DISPATCHED_NEW',data,whatappData);         
          break;
      case 'goods at site':{
        const data ={
          name :''
        }
        if(order.representativeId){
          const representative = await this.userService.findById(order.representativeId)
           data['name'] = representative.name 
        }  
         this.triggerNotification(progress,'DELIVERY_HANDOVER',data);            

        // }else{
        //   this.triggerNotification(progress,'DELIVERY_HANDOVER_WITHOUT_REPRESENTATIVE',data);            
        // }
        break;
      }
      case 'work in progress':{
        // const representative = await this.userService.findById(order.representativeId)
        const data = {
          name : ""
        }
        if(createdProgress.images && createdProgress.images.length){
          data['link'] = createdProgress.images[0]
        }else{
          data['link'] = this.configService.get('INSTALLATION_START_PIC')
        }
        this.triggerNotification(progress,'INSTALLATION_START_PIC',data);            
        break;
      }
      case 'work completed':{
          this.triggerNotification(progress,'JOB_COMPLETE');            
          break;
      }
     
      default:
          break;
      }
    await this.orderService.updateById(createdProgress.orderId, {
      status: createdProgress.progressStatus,
      updatedStatus:createdProgress.progress
    });
    return createdProgress;
  }

  async triggerNotification(progress, triggerName,data?,whatappData?){
    const user = await this.userService.findById(progress.userId);
    const notify = {
      category: 'Orders',
      trigger: triggerName,
      data,
      sms :{
        mobile : user.mobile
      },
      whatsapp:{
        mobile: user.mobile
      }
    }
    if(whatappData) notify.data['whatsappData'] = whatappData
    await this.notificationService.sendNotification(notify);
    
  }
  async findAll(filter: FindOptions) {
    return this.progressRepository.findAll(filter);
  }

  async findById(id: number): Promise<Progress> {
    return this.progressRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.progressRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.progressRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.progressRepository.upsert(data);
  }
}
