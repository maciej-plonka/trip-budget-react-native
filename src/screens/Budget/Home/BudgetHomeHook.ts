import {Id} from "../../../store";
import {useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectBudgetExpensesByTripId, selectTripById} from "../../../store/selectors";
import {Money} from "../../../models/Money";
import {sumBudgetExpenses} from "../../../store/models";

export type BudgetHome = {
    totalBudget:Money,
    totalBudgetSpent: Money
}


export const useBudgetHome = (tripId: Id): BudgetHome | undefined => {
    const trip = useSelector(selectTripById(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const expenses = useSelector(selectBudgetExpensesByTripId(tripId))

    if(!trip) {
        return;
    }

    return {
        totalBudget: trip.totalBudget,
        totalBudgetSpent: sumBudgetExpenses(expenses)
    }
}
