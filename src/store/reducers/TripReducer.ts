import {initialTripState, serialize, TripState} from "../states";
import {TripAction} from "../actions";
import {existsBy} from "../../utils/Collections";

export const tripReducer = (state: TripState = initialTripState, action: TripAction): TripState => {
    switch (action.type) {
        case "update_trip":
            return {...state, trips: [...state.trips].map(it => it.id === action.trip.id ? serialize(action.trip) : it)}
        case "create_trip":
            if(existsBy(state.trips, "id",action.trip.id)) {
                return state;
            }
            return {...state, trips: [...state.trips, serialize(action.trip)]}
        case "delete_trip":
            return {...state, trips: state.trips.filter(it => it.id !== action.tripId)}
    }
    return state;
}

