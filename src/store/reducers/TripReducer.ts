import {initialTripState, serialize, TripState} from "../states";
import {TripAction} from "../actions";

export const tripReducer = (state: TripState = initialTripState, action: TripAction): TripState => {
    switch (action.type) {
        case "create_trip":
            if(state.trips.some(it => it.id === action.trip.id)){
                throw Error("Trip with this id already exists")
            }
            return {...state, trips: [...state.trips, serialize(action.trip)]}
        case "update_trip":
            return {...state, trips: [...state.trips].map(it => it.id === action.trip.id ? serialize(action.trip) : it)}
        case "delete_trip":
            return {...state, trips: state.trips.filter(it => it.id !== action.tripId)}
    }
    throw new Error('Unsupported trip operation')
}

