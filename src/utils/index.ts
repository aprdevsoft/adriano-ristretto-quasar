export function dateFormat(date: string): string {
  const substring = date.substring(0, 10);
  const [y, m, d] = substring.split('-');
  return `${d}/${m}/${y}`;
}

export function dateFormatNumber(date: string): string {
  return dateFormat(date).replaceAll('/', '');
}

export function stringToDateFormat(date: string): string {
  const [d, m, y] = date.split('/');

  return `${y}-${m}-${d}T00:00:00`;
}

export function phoneFormat(phone: string): string {
  const match = RegExp(/^(\d{2})(\d{1})(\d{4})(\d{4})$/).exec(phone);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + ' ' + match[3] + '-' + match[4];
  }
  return '';
}
