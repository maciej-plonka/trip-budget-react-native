import {RootState} from "../reducers";
import {filterBy, findBy} from "../../utils/Collections";

export const selectAllShoppingItemsByTripId = (tripId: number) => (state: RootState) => filterBy(state.shoppingList.items,"tripId", tripId)
export const selectShoppingItemById = (id: number) => (state: RootState) => findBy(state.shoppingList.items, "id",id)
