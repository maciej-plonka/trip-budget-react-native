import {initialWishState, WishState} from "../states";
import {WishAction} from "../actions/WishActions";

export const wishReducer = (state: WishState = initialWishState, action: WishAction): WishState => {
    switch (action.type) {
        case "create_wish":
            return {...state, wishes: [...state.wishes, action.newWish]}
        case "update_wish":
            return {...state, wishes: state.wishes.map(it => it.id === action.item.id ? action.item : it)}
        case "delete_wish_by_trip_id":
            return {...state, wishes: state.wishes.filter(it => it.tripId !== action.tripId)}
        case "delete_wish_by_id":
            return {...state, wishes: state.wishes.filter(it => it.id !== action.id)}

    }
    throw new Error('Unsupported wish operation')
}
