import {addDays, endOfDay, isBefore} from "date-fns";

export const generateDayRange = (start: Date, end: Date) => {
    const range = []
    let current = new Date(start.getTime())
    while (isBefore(current, endOfDay(end))) {
        range.push(current)
        current = addDays(current, 1)
    }
    return range
}

export const generateLastDays = (days: number, now: Date = new Date()) => {
    if (days <= 0) return []
    return generateDayRange(addDays(now, -days), now)
}


