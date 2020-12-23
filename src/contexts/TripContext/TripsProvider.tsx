import React from "react"
import {TripsContext} from "./TripsContext";
import {useAsyncStorageState} from "../../hooks/AsyncStorageState";
import {TripsDispatch, TripsDispatchContext} from "./TripsDispatchContext";
import {NewTrip, Trip, UpdateTrip} from "./Trip";
import TripSerializer from "./TripSerializer";

type Props = {
    children?: React.ReactNode
}

const TripsProvider = ({children}: Props) => {
    const [trips, updateTrips] = useAsyncStorageState<Trip[]>("trips", [], TripSerializer);
    const dispatch: TripsDispatch = {
        updateTrip: async (updateTrip: UpdateTrip): Promise<void> => {
            const update = (trip: Trip) => trip.id === updateTrip.id ? ({...trip, ...updateTrip}) : trip
            await updateTrips(previous => previous.map(update));
        },
        addTrip: async (newTrip: NewTrip): Promise<void> => {
            const lastId = trips.map(t => t.id).reduce((a, b) => a > b ? a : b, 0);
            const trip = {...newTrip, id: lastId + 1}
            await updateTrips(previous => [...previous, trip])
        },
        removeTripById(tripId: number): Promise<Trip | undefined> {
            return Promise.resolve(undefined);
        }
    }
    return (
        <TripsContext.Provider value={trips}>
            <TripsDispatchContext.Provider value={dispatch}>
                {children}
            </TripsDispatchContext.Provider>
        </TripsContext.Provider>
    )
}

export default TripsProvider;
