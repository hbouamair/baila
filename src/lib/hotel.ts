export const HOTEL_NAME = 'Palm Plaza Marrakech'
export const HOTEL_ADDRESS = 'Av. du 7ème Art, Marrakech 40000, Morocco'
export const HOTEL_MAPS_URL = 'https://maps.google.com/?q=Palm+Plaza+Hotel+%26+Spa+Marrakech'
export const VISA_CHECKER_URL = 'https://www.acces-maroc.ma/#/'

export function withHotelName(text: string): string {
  return text
    .replace(/Palais des Congrès/gi, HOTEL_NAME)
    .replace(/Palm Plaza,\s*Marrakech/gi, HOTEL_NAME)
    .replace(/Palm Plaza,\s*Hivernage/gi, HOTEL_NAME)
    .replace(/\bPalm Plaza\b(?!\s+Marrakech)/gi, HOTEL_NAME)
    .replace(/Palm Plaza Marrakech,\s*Hivernage,\s*Marrakech/gi, HOTEL_NAME)
}

export function withHotelNameDeep<T>(value: T): T {
  if (typeof value === 'string') return withHotelName(value) as T
  if (Array.isArray(value)) return value.map((item) => withHotelNameDeep(item)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, withHotelNameDeep(item)]),
    ) as T
  }
  return value
}
