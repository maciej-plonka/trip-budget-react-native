import {Id} from "../../../store";
import {useSelector} from "react-redux";
import {
    selectBudgetByTripId,
    selectBudgetCategoriesByBudgetId, selectBudgetCategoriesByTripId,
    selectBudgetExpensesByBudgetId
} from "../../../store/selectors";
import {defaultMoney, Money} from "../../../models";
import {Budget, BudgetCategory, BudgetExpense, sumBudgetExpenses} from "../../../store/models";
import {filterBy} from "../../../utils/Collections";
import {useBudgetDailyExpenses} from "../TripDailyExpensesHook";
import {DailyExpense} from "../Expense/Daily/BudgetDailyExpenseHook";
import {useTripDaysRange} from "../TripDayRangeHook";
import {addDays, endOfDay, isAfter, isBefore, startOfDay} from "date-fns";
import {useMemo} from "react";


export type CategoryExpense = {
    category: BudgetCategory,
    expenses: ReadonlyArray<BudgetExpense>
}

const filterByLastDays = (daysBack: number, today: Date = new Date()) =>
    ({day}: DailyExpense) => isBefore(day, endOfDay(today)) && isAfter(day, startOfDay(addDays(today, -daysBack)))

type BudgetHome =
    { type: "NOT_FOUND" }
    | {
    type: "FOUND",
    budget: Budget,
    budgetExpenses: ReadonlyArray<BudgetExpense>,
    budgetCategories: ReadonlyArray<BudgetCategory>,
}

export const useBudgetHome = (tripId: Id, daysBack: number = 5): BudgetHome => {
    const budget = useSelector(selectBudgetByTripId(tripId))
    const budgetCategories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const budgetExpenses = useSelector(selectBudgetExpensesByBudgetId(tripId))
    // const days = useTripDaysRange(tripId)
    // const dailyExpenses = useBudgetDailyExpenses(tripId, days).filter(filterByLastDays(daysBack))
    // const totalBudgetSpent = useMemo(() => sumBudgetExpenses(expenses), [expenses])

    // const categoryExpenses = categories.map(category => ({
    //     category,
    //     expenses: filterBy(expenses, "categoryId", category.id)
    // }))

    if (!budget) {
        return {type: "NOT_FOUND"};
    }
    return {
        type: "FOUND",
        budget,
        budgetCategories,
        budgetExpenses
    }
}
