export type EventCreate = {
  title: string;
  description?: string;
  event_date: Date;
}

export type EventOutput = EventCreate & {
  id: string;
}