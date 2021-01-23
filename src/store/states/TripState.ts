import {endOfDay, isAfter, isBefore, startOfDay} from "date-fns"
import {HasId} from "../BaseTypes";

export type Trip = HasId & {
    name: string,
    startDate: Date,
    endDate: Date,
}

export const hasStarted = (trip: Trip, now: Date = new Date()): boolean => isBefore(startOfDay(trip.startDate), now)
export const hasNotEnded = (trip: Trip, now: Date = new Date()): boolean => isAfter(endOfDay(trip.endDate), now)
export const isActive = (trip: Trip, now: Date = new Date()): boolean => hasStarted(trip, now) && hasNotEnded(trip, now);

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
