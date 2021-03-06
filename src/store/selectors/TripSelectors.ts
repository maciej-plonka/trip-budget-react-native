import {State} from "../State";
import {deserializeTrip} from "../models";
import {Id} from "../BaseTypes";

export const selectTripById = (id: Id) => (state: State) => state.trips.map(deserializeTrip).find(it => it.id === id)
export const selectAllTrips = () => (state: State) => [...state.trips.map(deserializeTrip)]
