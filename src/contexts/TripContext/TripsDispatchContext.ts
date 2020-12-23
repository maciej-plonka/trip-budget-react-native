import {createContext, useContext} from "react";
import {NewTrip, Trip, UpdateTrip} from "./Trip";

export type TripsDispatch = {
    addTrip: (trip: NewTrip) => Promise<void>
    updateTrip: (trip: UpdateTrip) => Promise<void>
    removeTripById: (tripId: number) => Promise<Trip | undefined>
}
const emptyPromise = () => Promise.resolve();
export const TripsDispatchContext = createContext<TripsDispatch>({
    addTrip: () => emptyPromise(),
    removeTripById: () => emptyPromise().then(null),
    updateTrip: () => emptyPromise()
})

export const useTripsDispatchContext = () => useContext(TripsDispatchContext);


