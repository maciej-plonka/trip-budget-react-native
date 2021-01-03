import {useSelector} from "react-redux";
import {selectBudgetByTripId, selectBudgetCategoriesByBudgetId} from "../../store/selectors";

export const useBudgetCategoriesByTripId = (tripId: number) => {
    const budget = useSelector(selectBudgetByTripId(tripId))
    if (!budget)
        return [];
    return useSelector(selectBudgetCategoriesByBudgetId(budget.id)) ?? [];
}


