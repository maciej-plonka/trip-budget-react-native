import {differenceInDays, endOfDay, isAfter, isBefore, startOfDay} from "date-fns"
import {HasId} from "../BaseTypes";

export type Trip = HasId & {
    name: string,
    startDate: Date,
    endDate: Date,
}

export const hasStarted = (trip: Trip, now: Date = new Date()): boolean => isBefore(startOfDay(trip.startDate), now)
export const hasEnded = (trip: Trip, now: Date = new Date()): boolean => isAfter(now, endOfDay(trip.endDate))
export const isActive = (trip: Trip, now: Date = new Date()): boolean => hasStarted(trip, now) && !hasEnded(trip, now);
export const daysLeft = (trip: Trip, now: Date = new Date()): number => isActive(trip, now) ? differenceInDays(startOfDay(trip.endDate), startOfDay(now)) : 0;
export const daysUntil = (trip: Trip, now: Date = new Date()): number => isActive(trip, now) || hasEnded(trip, now)
    ? 0
    : differenceInDays(startOfDay(trip.startDate), startOfDay(now));
export type SerializedTrip = HasId & {
    name: string,
    startDate: number,
    endDate: number,
}
export const serialize = (deserialized: Trip): SerializedTrip => ({
    ...deserialized,
    startDate: deserialized.startDate.getTime(),
    endDate: deserialized.endDate.getTime(),
});

export const deserialize = (serialized: SerializedTrip): Trip => ({
    ...serialized,
    startDate: new Date(serialized.startDate),
    endDate: new Date(serialized.endDate)
});

export type TripState = {
    trips: Readonly<SerializedTrip[]>,
}


export const initialTripState: TripState = {
    trips: []
}
