/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum ApiEndpoints {
  USER_CREATE = '/user/create',
  USER_LOGIN = '/auth/token',
  USER_REFRESH_TOKEN = '/auth/refresh',
  USER_PROFILE = '/user/profile',


  TODO_ALL = '/todo/all',
  TODO_CREATE = '/todo',
  TODO_UPDATE = '/todo',
  TODO_DELETE = '/todo',
  TODO_LAST = '/todo',

  EVENTS = '/event'
  EVENT_CREATE = '/event'
}