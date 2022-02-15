export interface IDateProvider {
  compareDates(initialDate: Date, dateToCompare: Date): number
  convertToUtc(date: Date): string
  dateNow(): Date
}
