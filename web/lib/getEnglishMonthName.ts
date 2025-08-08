export function getEnglishMonthName(month: string | number): string {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const index = typeof month === "string" ? parseInt(month, 10) - 1 : month - 1;

  return monthNames[index] || "Unknown month";
}