import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { excludedRoutes } from '../../excluded.routes';
import { QueryService } from 'src/common/services/query/query.service';
import { Query } from 'src/common/services/query/query';
import { CanContextService } from 'libs/common/src';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      if (this.validateExcludedRoute(context)) {
        return true;
      }
      const appContext = CanContextService.getAppContext();
      const authService = appContext.get(AuthService);
      const queryService = appContext.get(QueryService);
      const token = this.extractAuthorizationHeader(request.headers);
      if (!token) {
        return false;
      }
      const isBearerToken = await this.validateTokenAndType(
        token,
        'Bearer',
        authService,
      );
      if (!isBearerToken) {
        return false;
      }
      const decodedValue: any = await this.extractTokenValue(
        authService,
        token,
      );
      if (!decodedValue) {
        return false;
      }
      const user = await queryService.executeQuery<any[]>(
        Query.getActiveUserAndPermissions(decodedValue.id),
      );
      if (!user.length) {
        return false;
      }
      request['user'] = user[0];
      /**
       * Add Created By And Updated By to the Request Body
       */
      if (request['user'] && request['user'].user_id) {
        if (request.method.toUpperCase() === 'POST') {
          request.body = {
            ...request.body,
            createdById: request['user'].user_id,
          };
          return true;
        }
        if (
          request.method.toUpperCase() === 'PATCH' ||
          request.method.toUpperCase() === 'PUT'
        ) {
          request.body = {
            ...request.body,
            updatedById: request['user'].user_id,
          };
          return true;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private validateExcludedRoute(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url.split('?')[0];
    if (url) {
      const excludedRoute = excludedRoutes.find(element => {
        if (element.variables && element.variables.length) {
          const splittedUrl = url.split('/');
          const mappedSplittedUrl = element.url.split('/');
          if (splittedUrl.length != mappedSplittedUrl.length) {
            return false;
          }
          for (let i = 0; i < element.variables.length; i++) {
            const v = element.variables[i];
            if (v.type === 'number') {
              if (isNaN(parseInt(splittedUrl[v.index]))) {
                return false;
              }
            }
            mappedSplittedUrl[v.index] = splittedUrl[v.index];
          }
          const newUrl = mappedSplittedUrl.join('/');
          return url.toLowerCase() === newUrl.toLowerCase();
        }
        return element.url.toLowerCase() === url.toLowerCase();
      });
      if (excludedRoute) {
        if (excludedRoute.method === 'ALL') return true;
        return (
          request.method.toLowerCase() === excludedRoute.method.toLowerCase()
        );
      }
    }
    return false;
  }

  private extractAuthorizationHeader(
    headers: IncomingHttpHeaders,
  ): string | null {
    if ('authorization' in headers) {
      return headers['authorization'];
    }
    return null;
  }

  private async validateTokenAndType(
    token: string,
    type: string,
    authService: AuthService,
  ) {
    if (!token || !type) {
      return false;
    }
    const splittedToken = token.split(' ');
    if (splittedToken.length != 2) {
      return false;
    }
    if (splittedToken[0] !== type) {
      return false;
    }
    const isValidToken = await authService.validateToken(splittedToken[1]);
    if (!isValidToken) {
      return false;
    }
    return true;
  }

  private extractTokenValue(authService: AuthService, token: string) {
    const decoded = authService.decodeToken(token.split(' ')[1]);
    return decoded;
  }
}
