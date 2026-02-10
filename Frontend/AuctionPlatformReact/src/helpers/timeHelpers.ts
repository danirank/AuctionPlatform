export function getTimeLeft(endDateUtc: string): string {
  const now = Date.now();
  const end = new Date(endDateUtc).getTime();

  let diffMs = end - now;

  if (diffMs <= 0) return "Slut";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} dag${days > 1 ? "ar" : ""}`;
  }

  if (hours > 0) {
    return `${hours} tim`;
  }

  if (minutes > 0) {
    return `${minutes} min`;
  }

  return `${seconds} sek`;
}

export function FormatDate(dateTime:string) {
    return new Date(dateTime).toLocaleString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}