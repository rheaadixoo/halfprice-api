import { CanExcludeRoute } from './core/auth/auth.type';

export const excludedRoutes: CanExcludeRoute[] = [
  {
    url: '/v1',
    method: 'GET',
  },
  {
    url: '/v1/auth/login/email',
    method: 'POST',
  },
  {
    url: '/v1/auth/login/mobile',
    method: 'POST',
  },
  {
    url: '/v1/auth/google/login-url',
    method: 'POST',
  },
  {
    url: '/v1/auth/google/redirect',
    method: 'POST',
  },
  {
    url: '/v1/auth/facebook/login-url',
    method: 'POST',
  },
  {
    url: '/v1/auth/facebook/redirect',
    method: 'POST',
  },
  {
    url: '/v1/auth/generate-otp',
    method: 'POST',
  },
  {
    url: '/v1/auth/recover',
    method: 'POST',
  },
  {
    url: '/v1/auth/reset-password',
    method: 'POST',
  },
  {
    url: '/v1/otps/generate',
    method: 'POST',
  },
  {
    url: '/v1/otps/validate',
    method: 'POST',
  },
  {
    url: '/v1/categories',
    method: 'GET',
  },
  {
    url: '/v1/projects',
    method: 'GET',
  },
  {
    url: '/v1/configurations',
    method: 'GET',
  },
  {
    url: '/v1/leads',
    method: 'POST',
  },
  {
    url: '/v1/users',
    method: 'POST',
  },
  {
    url: '/v1/users/:id',
    method: 'GET',
    variables: [
      {
        index: 3,
        type: 'number',
      },
    ],
  },
  {
    url: '/v1/payments/status',
    method: 'POST',
  },
  {
    url: '/v1/payments/make-payment',
    method: 'POST',
  },
  {
    url: '/v1/payments/failed',
    method: 'GET',
  },
  {
    url: '/v1/payments/pending',
    method: 'GET',
  },
  {
    url: '/v1/payments/success',
    method: 'GET',
  },
  {
    url: '/v1/payments/pay',
    method: 'GET',
  },
  {
    url: '/v1/payments/generate',
    method: 'GET',
  },
  {
    url: '/v1/payments/checkout',
    method: 'GET',
  },
  {
    url: '/v1/payments',
    method: 'POST',
  },
  {
    url:'/v1/room-types',
    method:'GET'
  },
  {
    url:'/v1/packages/group',
    method:'POST'
  }
  // {
  //   url:'/v1/configurations',
  //   method:'GET'
  // },

  // {
  //   url:'/v1/users',
  //   method:'PATCH'
  // },
  // {
  //   url:'/v1/users',
  //   method:'GET'
  // },
  // {
  //   url:'/v1/leads',
  //   method:'GET'
  // },

  // {
  //   url:'/v1/leads',
  //   method:'PATCH'
  // },
  // {
  //   url:'/v1/products',
  //   method:'GET'
  // },
  // {
  //   url:'/v1/categories',
  //   method:'GET'
  // },
  // {
  //   url:'/v1/orders',
  //   method:'POST'
  // },

  // {
  //   url:'/v1/orders',
  //   method:'GET'
  // },
  // '/v1/users',
  // '/v1/roles',
  // '/v1/permissions',
  // '/v1/user-role',
  // '/v1/role-permission',
];
