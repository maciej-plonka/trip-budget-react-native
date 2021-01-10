import {useSelector} from "react-redux";
import {selectAllShoppingItemsByTripId} from "../../../../store/selectors";
import {ShoppingListItem} from "../../../../store/states";

export const useShoppingListItems = (tripId: number): Readonly<ShoppingListItem[]> => {
    return useSelector(selectAllShoppingItemsByTripId(tripId))
}
