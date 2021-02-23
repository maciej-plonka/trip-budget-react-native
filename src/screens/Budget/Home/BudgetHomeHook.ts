import {Id} from "../../../store";
import {useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectBudgetExpensesByTripId, selectTripById} from "../../../store/selectors";
import {Money} from "../../../models";
import {BudgetCategory, BudgetExpense, sumBudgetExpenses} from "../../../store/models";
import {filterBy} from "../../../utils/Collections";
import {useTripDailyExpenses} from "../TripDailyExpensesHook";
import {DailyExpense} from "../Daily/BudgetDailyHook";
import {useTripDaysRange} from "../TripDayRangeHook";
import {addDays, endOfDay, isAfter, isBefore, startOfDay} from "date-fns";
import {useMemo} from "react";

export type BudgetHome = {
    totalBudget: Money,
    totalBudgetSpent: Money,
    categoryExpenses: ReadonlyArray<CategoryExpense>,
    dailyExpenses: ReadonlyArray<DailyExpense>
}

export type CategoryExpense = {
    category: BudgetCategory,
    expenses: ReadonlyArray<BudgetExpense>
}

const filterByLastDays = (daysBack: number, today: Date = new Date()) =>
    ({day}: DailyExpense) =>  isBefore(day, endOfDay(today)) && isAfter(day, startOfDay(addDays(today, -daysBack)))

export const useBudgetHome = (tripId: Id, daysBack: number = 5): BudgetHome | undefined => {
    const trip = useSelector(selectTripById(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const expenses = useSelector(selectBudgetExpensesByTripId(tripId))
    const days = useTripDaysRange(tripId)
    const dailyExpenses = useTripDailyExpenses(tripId, days).filter(filterByLastDays(daysBack))
    const totalBudgetSpent = useMemo(() => sumBudgetExpenses(expenses), [expenses])

    if (!trip) {
        return;
    }
    const categoryExpenses = categories.map(category => ({
        category,
        expenses: filterBy(expenses, "categoryId", category.id)
    }))


    return {
        totalBudget: trip.totalBudget,
        totalBudgetSpent,
        categoryExpenses,
        dailyExpenses
    }
}
