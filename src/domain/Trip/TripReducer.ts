import {Trip} from "./Types";
import {Reducer, useAsyncStorageReducer} from "../../hooks/AsyncStorageReducer";
import TripSerializer from "./TripSerializer";

export type TripAction =
    { type: "create", newTrip: Trip } |
    { type: "update", updateTrip: Trip } |
    { type: "delete", tripId: number }


const TripReducer: Reducer<Trip[], TripAction> = (state, action) => {
    switch (action.type) {
        case "create":
            const trip = action.newTrip
            if(state.some(it => it.id === trip.id)) {
                throw Error("Trip already exists ")
            }
            return [...state, trip]
        case "update":
            const targetTrip = action.updateTrip
            return state.map(it => it.id === targetTrip.id ? ({...targetTrip}) : ({...it}))
        case "delete":
            return state.filter(it => it.id !== action.tripId);
    }
}


export const useTripReducer = () => useAsyncStorageReducer("trips", TripReducer, [], TripSerializer);
