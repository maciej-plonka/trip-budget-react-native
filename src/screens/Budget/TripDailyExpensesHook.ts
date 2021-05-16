import {Id} from "../../store";
import {useSelector} from "react-redux";
import {selectBudgetById, selectBudgetExpensesByBudgetId} from "../../store/selectors";
import {useMemo} from "react";
import {Budget, BudgetExpense} from "../../store/models";
import {copyCurrency, Money, sumMoney} from "../../models";
import {isSameDay} from "date-fns";
import {DailyExpense} from "./Expense/Daily/BudgetDailyExpenseHook";

const generateDailyExpenses = (budget: Budget, days: ReadonlyArray<Date>, allExpenses: ReadonlyArray<BudgetExpense>): ReadonlyArray<DailyExpense> => {
    if (!days.length) {
        return [];
    }
    const dailyExpenses = [] as DailyExpense[]
    let sumSpent: Money = copyCurrency(budget.totalBudget, 0)
    for (let dayIndex = days.length - 1; dayIndex >= 0; dayIndex--) {
        const day = days[dayIndex]
        const expensesThatDay = allExpenses.filter(it => isSameDay(it.date, day))
        const maxAmount = (budget.totalBudget.amount - sumSpent.amount) / days.length
        const max = copyCurrency(budget.totalBudget, maxAmount)
        dailyExpenses.unshift({max, expenses: expensesThatDay, day})
        const spent = sumMoney(expensesThatDay.map(it => it.value))
        sumSpent = sumMoney([sumSpent, spent])
    }
    return dailyExpenses
}

export const useBudgetDailyExpenses = (budgetId: Id, days: ReadonlyArray<Date>) => {
    const budget = useSelector(selectBudgetById(budgetId))
    const expenses = useSelector(selectBudgetExpensesByBudgetId(budgetId))
    return useMemo(() => budget ? generateDailyExpenses(budget, days, expenses) : [], [budget, days, expenses])
}
