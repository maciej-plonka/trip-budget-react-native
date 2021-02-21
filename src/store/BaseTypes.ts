export type Id = string

export type HasId = {
    id: Id
}

export type DayOfYear = {
    day: number,
    month: number,
    year: number
}

export const toDayOfYear = (date: Date) => ({day: date.getDay(), month: date.getMonth() + 1, year: date.getFullYear()})
export const daysAreEqual = (first: DayOfYear, second: DayOfYear) => first.day === second.day
    && first.month === second.month
    && first.year === second.year
