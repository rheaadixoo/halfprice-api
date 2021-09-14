import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CanPermissionsConfig } from './permissions.type';
import { CanPermissionsService } from './permissions.service';
import { CanContextService } from '../services/context/context.service';
import { excludedRoutes } from 'src/excluded.routes';

@Injectable()
export class CanPermissionsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      if (this.validateExcludedRoute(context)) {
        return true;
      }
      // Permissions Service
      const permissionService = CanContextService.getAppContext().get(
        CanPermissionsService,
      );
      /**
       * Extract Permissions
       */
      const permissions: CanPermissionsConfig = permissionService.extractPermissions(
        context,
      );
      /**
       * Validation Permissions If and / or permissions
       */
      if (
        permissions &&
        ((permissions.and && permissions.and.length) ||
          (permissions.or && permissions.or.length))
      ) {
        const currentUser = permissionService.extractRolesAndPermissions(
          context,
        );
        const isValid = permissionService.validatePermission(
          currentUser,
          permissions,
        );
        if (!isValid) {
          return false;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  private validateExcludedRoute(context:ExecutionContext){
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url.split('?')[0];
    if (url) {
      const excludedRoute = excludedRoutes.find(element => element.url.toLowerCase() === url.toLowerCase());
      if(excludedRoute){
        if(excludedRoute.method === 'ALL') return true;
        return request.method.toLowerCase() === excludedRoute.method.toLowerCase()
      }
    }
    return false;
  }
}
