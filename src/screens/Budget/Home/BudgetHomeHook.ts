import {DayOfYear, Id, toDayOfYear} from "../../../store";
import {useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectBudgetExpensesByTripId, selectTripById} from "../../../store/selectors";
import {copyCurrency, defaultMoney, Money} from "../../../models/Money";
import {BudgetCategory, BudgetExpense, sumBudgetExpenses, Trip} from "../../../store/models";
import {filterBy} from "../../../utils/Collections";
import {addDays} from "date-fns";

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

export type DailyExpense = {
    day: DayOfYear,
    max: Money,
    spent: Money
}

const useDailyExpenses = (expenses: ReadonlyArray<BudgetExpense>, trip?: Trip): ReadonlyArray<DailyExpense> => {
    const now = new Date()
    const money = defaultMoney();
    return [
        {day: toDayOfYear(now), max: copyCurrency(money, 800), spent: copyCurrency(money, 300)},
        {day: toDayOfYear(addDays(now, -1)), max: copyCurrency(money, 1000), spent: copyCurrency(money, 100)},
    ]
}

export const useBudgetHome = (tripId: Id): BudgetHome | undefined => {
    const trip = useSelector(selectTripById(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const expenses = useSelector(selectBudgetExpensesByTripId(tripId))
    const dailyExpenses = useDailyExpenses(expenses, trip)

    if (!trip) {
        return;
    }
    const categoryExpenses = categories.map(category => ({
        category,
        expenses: filterBy(expenses, "categoryId", category.id)
    }))


    return {
        totalBudget: trip.totalBudget,
        totalBudgetSpent: sumBudgetExpenses(expenses),
        categoryExpenses,
        dailyExpenses
    }
}
