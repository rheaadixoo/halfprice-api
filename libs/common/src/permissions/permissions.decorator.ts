import { SetMetadata } from '@nestjs/common';
import { CAN_PERMISSIONS_CONFIG } from './permissions.constant';
import { CanPermissionsConfig } from './permissions.type';

export const CanPermissions = (permissions: CanPermissionsConfig) =>
  SetMetadata(CAN_PERMISSIONS_CONFIG, permissions);



  // export const CanPermissions = (option: CanPermissionOption) =>{

  //   const permissions = option.source
  //   SetMetadata(CAN_PERMISSIONS_CONFIG, permissions);
  // }