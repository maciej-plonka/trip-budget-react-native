import {RootState} from "../reducers";

export const selectAllByTripId = (tripId: number) => (state: RootState) => state.shoppingList.items.filter(it => it.tripId === tripId)
