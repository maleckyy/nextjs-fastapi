/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum ApiEndpoints {
  USER_CREATE = '/user/create',
  USER_LOGIN = '/auth/token',
  USER_REFRESH_TOKEN = '/auth/refresh',
  USER_PROFILE = '/user/profile',
  USER_DETAILS = '/details',
  USER_GET_RESUME = '/details/resume',

  PROFILE_STACK = '/details/stack',

  LOGOUT = '/auth/logout',

  TODO_ALL = '/todo/all',
  TODO_CREATE = '/todo',
  TODO_UPDATE = '/todo',
  TODO_DELETE = '/todo',
  TODO_LAST = '/todo',

  EVENTS = '/event',
  EVENT_CREATE = '/event',
  EXPENSE_SUMMARY = "/expenses/monthly",
  EXPENSE = '/expenses',
  EXPENSE_DELETE = '/expenses',
}