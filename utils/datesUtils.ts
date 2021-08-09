import { format } from 'date-fns';

export const formatCheckDate = (date: Date) => {
  if (!date) return '';
  return format(date, 'MMM d');
};

export const rangeDate = (startDate, endDate) => {
  if (!startDate && !endDate) return false;
  let template = `${formatCheckDate(startDate)} - ${formatCheckDate(endDate)}`;
  if (startDate === endDate) template = formatCheckDate(startDate);
  return template;
};
