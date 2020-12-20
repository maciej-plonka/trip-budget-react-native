import {createContext, useContext} from "react";
import {NewTrip, Trip} from "./Trip";

export type TripsDispatch = {
    addTrip: (trip: NewTrip) => Promise<void>
    removeTripById: (tripId: number) => Promise<Trip | undefined>
}
const emptyPromise = () => Promise.resolve();
export const TripsDispatchContext = createContext<TripsDispatch>({
    addTrip: () => emptyPromise(),
    removeTripById: () => emptyPromise().then(null)
})

export const useTripsDispatchContext = () => useContext(TripsDispatchContext);


