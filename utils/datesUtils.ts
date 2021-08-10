import { format } from 'date-fns';

export const formatCheckDate = (date: Date, dateFormat?: string) => {
  if (!date) return '';
  return format(date, dateFormat || 'MMM d');
};

export const formatRangeDate = (startDate, endDate) => {
  if (!startDate || !endDate) return false;
  let template = `${formatCheckDate(startDate)} - ${formatCheckDate(endDate)}`;
  if (formatCheckDate(startDate, 'd m y') === formatCheckDate(endDate, 'd m y')) {
    template = `${formatCheckDate(startDate)} - ${
      parseInt(formatCheckDate(endDate, 'd')) + 1
    }`;
  }

  if (formatCheckDate(startDate, 'y') !== formatCheckDate(endDate, 'y')) {
    template = `${formatCheckDate(startDate, 'MMM d, y')} - ${formatCheckDate(
      endDate,
      'MMM d, y'
    )}`;
  }
  return template;
};
