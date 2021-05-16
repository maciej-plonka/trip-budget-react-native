import {Action} from "redux";
import {NewTrip, Trip} from "../models";
import {Id} from "../BaseTypes";

export type CreateTripAction = Action<"create_trip"> & { trip: NewTrip };
export type UpdateTripAction = Action<"update_trip"> & { trip: Trip };
export type DeleteTripAction = Action<"delete_trip"> & { tripId: Id };
export type TripAction =
    CreateTripAction |
    UpdateTripAction |
    DeleteTripAction

export const createTrip = (trip: NewTrip): CreateTripAction => ({type: "create_trip", trip});
export const updateTrip = (trip: Trip): UpdateTripAction => ({type: "update_trip", trip})
export const deleteTrip = (tripId: Id): DeleteTripAction => ({type: "delete_trip", tripId})

