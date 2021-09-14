export interface CanExcludeRoute {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL';
  variables?: CanExcludeRouteVariable[];
}

export interface CanExcludeRouteVariable {
  index: number;
  type: 'number' | 'string';
}
