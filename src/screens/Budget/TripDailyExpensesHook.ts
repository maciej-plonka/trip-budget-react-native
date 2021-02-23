import {Id} from "../../store";
import {useSelector} from "react-redux";
import {selectBudgetExpensesByTripId, selectTripById} from "../../store/selectors";
import {useMemo} from "react";
import {BudgetExpense, Trip} from "../../store/models";
import {copyCurrency, Money, sumMoney} from "../../models";
import {isSameDay} from "date-fns";
import {DailyExpense} from "./Daily/BudgetDailyHook";
const generateDailyExpenses = (trip: Trip, days: ReadonlyArray<Date>, allExpenses: ReadonlyArray<BudgetExpense>): ReadonlyArray<DailyExpense> => {
    if (!days.length) {
        return [];
    }
    const dailyExpenses = [] as DailyExpense[]
    let sumSpent: Money = copyCurrency(trip.totalBudget, 0)
    for (let dayIndex = days.length - 1; dayIndex >= 0; dayIndex--) {
        const day = days[dayIndex]
        const expensesThatDay = allExpenses.filter(it => isSameDay(it.date, day))
        const maxAmount = (trip.totalBudget.amount - sumSpent.amount) / days.length
        const max = copyCurrency(trip.totalBudget, maxAmount)
        dailyExpenses.unshift({max, expenses: expensesThatDay, day})
        const spent = sumMoney(expensesThatDay.map(it => it.value))
        sumSpent = sumMoney([sumSpent, spent])
    }
    return dailyExpenses
}

export const useTripDailyExpenses = (tripId: Id, days: ReadonlyArray<Date>) => {
    const trip = useSelector(selectTripById(tripId))
    const expenses = useSelector(selectBudgetExpensesByTripId(tripId))
    return useMemo(() => trip ? generateDailyExpenses(trip, days, expenses) : [], [trip, days, expenses])
}
