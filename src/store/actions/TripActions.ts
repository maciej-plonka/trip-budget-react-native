import {Action} from "redux";
import {NewTrip, Trip} from "../models";
import {Id} from "../BaseTypes";

export type TripAction =
    (Action<"create_trip"> & { trip: NewTrip }) |
    (Action<"update_trip"> & { trip: Trip }) |
    (Action<"delete_trip"> & { tripId: Id })



export const createTrip = (trip: NewTrip): TripAction => ({type: "create_trip", trip});
export const updateTrip = (trip: Trip): TripAction => ({type: "update_trip", trip})
export const deleteTrip = (tripId: Id): TripAction => ({type: "delete_trip", tripId})

