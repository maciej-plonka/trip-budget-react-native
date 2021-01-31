import {State} from "../State";
import {deserialize} from "../models";
import {Id} from "../BaseTypes";

export const selectTripById = (id: Id) => (state: State) => state.trips.map(deserialize).find(it => it.id === id)
export const selectAllTrips = (state: State) => [...state.trips.map(deserialize)]
