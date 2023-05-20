import { addHours, format } from 'date-fns';

export function getTimeZone() {
  const offset = new Date().getTimezoneOffset();
  const o = Math.abs(offset);
  return Number(
    `${(offset < 0 ? '+' : '-') + `${Math.floor(o / 60)}`.slice(-2)}`,
  );
}

export const formatDate = (createdDate?: string) =>
  createdDate
    ? format(
        addHours(new Date(createdDate), getTimeZone()),
        'yyyy-MM-dd kk:mm:ss',
      )
    : '';
