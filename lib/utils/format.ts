/**
 * Format a number with commas as thousands separators
 */
export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Format a number as currency
 */
export function formatCurrency(value: number, currency = "USD", decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Format a number as a percentage
 */
export function formatPercent(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

/**
 * Truncate a string in the middle
 */
export function truncateMiddle(str: string, startChars = 4, endChars = 4, separator = "..."): string {
  if (!str) return ""
  if (str.length <= startChars + endChars) return str

  return `${str.substring(0, startChars)}${separator}${str.substring(str.length - endChars)}`
}

/**
 * Format a date
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", options || defaultOptions).format(dateObj)
}
