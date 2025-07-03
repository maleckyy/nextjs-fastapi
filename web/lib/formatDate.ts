export function formatDate(dateStr: string) {
  const fixed = dateStr.replace(/\.(\d{3})\d+/, '.$1');
  const d = new Date(fixed);
  if (isNaN(d.getTime())) return 'Invalid date';
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}