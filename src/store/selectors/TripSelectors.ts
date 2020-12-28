import {RootState} from "../reducers";
import {deserialize} from "../states";

export const selectTripById = (id: number) => (state: RootState) => state.trips.trips.map(deserialize).find(it => it.id === id)
export const selectAllTrips = (state: RootState) => [...state.trips.trips.map(deserialize)]
