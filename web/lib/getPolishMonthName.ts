export function getPolishMonthName(month: string | number): string {
  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  const index = typeof month === "string" ? parseInt(month, 10) - 1 : month - 1;

  return monthNames[index] || "Nieznany miesiąc";
}