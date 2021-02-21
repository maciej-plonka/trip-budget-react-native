import {DayOfYear, HasId, toDayOfYear} from "../BaseTypes";
import {Money} from "../../models/Money";
import {addDays, differenceInDays, endOfDay, isAfter, isBefore, startOfDay} from "date-fns";

export type Trip = HasId & {
    name: string,
    image?: string,
    startDate: Date,
    endDate: Date,
    totalBudget: Money,
}

export type NewTrip = {
    name: string,
    image?: string,
    startDate: Date,
    endDate: Date,
    totalBudget: Money
}

export const daysRange = (trip: Trip): ReadonlyArray<DayOfYear> => {
    const days = []
    let date = new Date(trip.startDate.getTime())
    while(isBefore(startOfDay(date), endOfDay(trip.endDate))){
        days.push(toDayOfYear(date))
        date = addDays(date, 1)
    }
    return days
}

export const hasStarted = (trip: Trip, now: Date = new Date()): boolean => isBefore(startOfDay(trip.startDate), now)
export const hasEnded = (trip: Trip, now: Date = new Date()): boolean => isAfter(now, endOfDay(trip.endDate))
export const isActive = (trip: Trip, now: Date = new Date()): boolean => hasStarted(trip, now) && !hasEnded(trip, now);
export const daysLeft = (trip: Trip, now: Date = new Date()): number => isActive(trip, now) ? differenceInDays(startOfDay(trip.endDate), startOfDay(now)) : 0;
export const daysUntil = (trip: Trip, now: Date = new Date()): number => isActive(trip, now) || hasEnded(trip, now)
    ? 0
    : differenceInDays(startOfDay(trip.startDate), startOfDay(now));
export type SerializedTrip = Omit<Trip, "startDate" | "endDate"> & {
    startDate: number,
    endDate: number,
}
export const serializeTrip = (deserialized: Trip): SerializedTrip => ({
    ...deserialized,
    startDate: deserialized.startDate.getTime(),
    endDate: deserialized.endDate.getTime(),
});

export const deserializeTrip = (serialized: SerializedTrip): Trip => ({
    ...serialized,
    startDate: new Date(serialized.startDate),
    endDate: new Date(serialized.endDate)
});
