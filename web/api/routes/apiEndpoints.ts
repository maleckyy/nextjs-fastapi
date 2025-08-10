/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum ApiEndpoints {
  USER_CREATE = '/user/create',
  USER_LOGIN = '/auth/token',
  USER_REFRESH_TOKEN = '/auth/refresh',
  USER = '/user',
  USER_PROFILE = '/user/profile',
  USER_UPDATE_ACCOUNT = '/user/update',
  USER_DETAILS = '/details',
  USER_GET_RESUME = '/details/resume',

  PROFILE_STACK = '/details/stack',
  PROFILE_EXPERIENCE = '/details/experience',
  UPLOAD_AVATAR = '/upload-avatar',

  LOGOUT = '/auth/logout',

  TODO_ALL = '/todo/all',
  TODO_CREATE = '/todo',
  TODO_UPDATE = '/todo',
  TODO_DELETE = '/todo',
  TODO_LAST = '/todo',

  EVENTS = '/event',
  EVENTS_UPCOMING = '/event/upcoming',
  EVENT_CREATE = '/event',
  EXPENSE_SUMMARY = "/expenses/monthly",
  EXPENSE_STATS = "/expenses/stats/expenses-summary",
  EXPENSE = '/expenses',
  EXPENSE_RECENT_TRANSACTION = "/expenses/recent-transaction",
  EXPENSE_DELETE = '/expenses',
}