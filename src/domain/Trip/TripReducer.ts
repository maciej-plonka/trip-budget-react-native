import {NewTrip, UpdateTrip, Trip} from "./Types";
import {Reducer, useAsyncStorageReducer} from "../../hooks/AsyncStorageReducer";
import {TripSerializer} from "./index";

export type TripAction =
    { type: "create", newTrip: NewTrip } |
    { type: "update", updateTrip: UpdateTrip }


const TripReducer: Reducer<Trip[], TripAction> = (state, action) => {
    switch (action.type) {
        case "create":
            const nextId = state.map(it => it.id).reduce((a, b) => a > b ? a : b, 0) + 1
            const trip: Trip = {
                ...action.newTrip,
                id: nextId,
            }
            return [...state, trip]
        case "update":
            const targetTrip = action.updateTrip
            return state.map(it => it.id === targetTrip.id ? ({...targetTrip}) : ({...it}))
    }
}


export const useTripReducer = () => useAsyncStorageReducer("trips", TripReducer, [], TripSerializer);
