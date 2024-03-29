import {filterBy, findBy} from "../../utils/Collections";
import {State} from "../State";
import {Id} from "../BaseTypes";

export const selectAllWishesByTripId = (tripId: Id) => (state: State) => filterBy(state.wishes, "tripId", tripId)
export const selectWishById = (id: Id) => (state: State) => findBy(state.wishes, "id", id)

export const selectBudgetCategoryByWishId = (id: Id) => (state: State) => {
    const wish = findBy(state.wishes, "id", id)
    if (!wish || !wish.budgetCategoryId) return null
    return findBy(state.budgetCategories, "id", wish.budgetCategoryId);
}
