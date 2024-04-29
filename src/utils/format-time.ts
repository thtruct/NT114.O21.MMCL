import { enGB, enUS, nl } from 'date-fns/locale';
import { format, formatDistanceToNow, getTime } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export const getLocalByCurrentLang = () => {
  const langStorage = localStorage.getItem('i18nextLng');
  switch (langStorage) {
    case 'nl':
      return nl;
    case 'en':
      return enUS;
    default:
      return enGB;
  }
};

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function isBetween(inputDate: Date | string | number, startDate: Date, endDate: Date) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate: Date | null, endDate: Date | null) {
  const results =
    startDate && endDate ? new Date(startDate).getTime() > new Date(endDate).getTime() : false;

  return results;
}

export function fDateLocale(date: Date | string | number, formatType: string = 'dd MMMM yyyy') {
  return format(new Date(date), formatType, { locale: getLocalByCurrentLang() });
}

export function fSecondsToTime(secs: number) {
  const dates = Math.floor(secs / (60 * 60 * 24));

  const divisorForHours = secs % (60 * 60 * 24);
  const hours = Math.floor(divisorForHours / (60 * 60));

  const divisorForMinutes = secs % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60);
  return {
    dates: !dates ? '' : `${dates}d`,
    hours: !hours ? '' : `${hours}h`,
    minutes: !minutes ? '' : `${minutes}m`,
  };
}
