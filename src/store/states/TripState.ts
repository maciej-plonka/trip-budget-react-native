export type Trip = HasId &{
    name: string,
    startDate: Date,
    endDate: Date,
}

export type SerializedTrip = HasId &{
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
