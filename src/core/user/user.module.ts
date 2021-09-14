import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CanLoggerModule } from '../logger/logger.module';
import { UserRepository } from './user.repository';
import { CommonModule } from 'src/common/common.module';
import { CanStateMachineModule } from 'libs/state-machine/src';
import { CanCommonModule } from 'libs/common/src';
import { UserStateMachine } from './user-state-machine';
import { SharedModule } from 'src/apis/shared/shared.module';
import { UserRoleModule } from '../auth/user-role/user-role.module';
import { RoleModule } from '../auth/role/role.module';

@Module({
  imports: [
    CanLoggerModule,
    CommonModule,
    CanStateMachineModule.forRoot(UserStateMachine.getConfig()),
    CanCommonModule,
    SharedModule,
    UserRoleModule,
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
