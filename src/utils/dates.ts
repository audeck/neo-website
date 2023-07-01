type Format = 'YYYY-MM-DD';

export const getDateFormatted = (format: Format, date: Date = new Date()): string => {
  switch (format) {
    case 'YYYY-MM-DD':
      const year: string = String(date.getFullYear());
      const month: string = String(date.getMonth() + 1).padStart(2, '0');
      const day: string = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;

    default:
      return date.toLocaleString();
  }
}

export const getDayOrdinal = (day: number): string => {
  const lastDigit = String(day).slice(-1);
  let suffix: string;

  switch (lastDigit) {
    case '1':
      suffix = 'st';
      break;
    case '2':
      suffix = 'nd';
      break;
    case '3':
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }

  return day + suffix;
}
