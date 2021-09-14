export interface CanPermissionsConfig {
  and?: string[];
  or?: string[];
}
export interface CanRoutePermission{
  path: string;
  items:CanRoutePermissionItem[];
}

export interface CanRoutePermissionItem{
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  permission: CanPermissionsConfig;
}
export interface CanPermissionOption{
  path:string;
  source:CanRoutePermission;
}