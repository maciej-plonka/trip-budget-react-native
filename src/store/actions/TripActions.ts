import {Action} from "redux";
import {Trip} from "../states";

export type TripAction =
    (Action<"create_trip"> & { trip: Trip }) |
    (Action<"update_trip"> & { trip: Trip }) |
    (Action<"delete_trip"> & { tripId: number })



export const createTrip = (trip: Trip): TripAction => ({type: "create_trip", trip});
export const updateTrip = (trip: Trip): TripAction => ({type: "update_trip", trip})
export const deleteTrip = (tripId: number): TripAction => ({type: "delete_trip", tripId})

