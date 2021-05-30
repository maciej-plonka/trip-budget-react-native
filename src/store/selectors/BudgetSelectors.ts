import {filterBy, findBy} from "../../utils/Collections";
import {State} from "../State";
import {Id} from "../BaseTypes";
import {BudgetCategory, deserializeExpense} from "../models";

export const selectBudgetByTripId = (tripId: Id) => (state: State) => findBy(state.budgets, "tripId", tripId)
export const selectBudgetById = (id: Id) => (state: State) => findBy(state.budgets, "id", id);
export const selectBudgetCategoryById = (id: Id) => (state: State) => findBy(state.budgetCategories, "id", id);
export const selectBudgetExpenseById = (id: Id) => (state: State) => findBy(state.budgetExpenses.map(deserializeExpense), "id", id);

export const selectBudgetCategoriesByBudgetId = (budgetId: Id) =>
    (state: State) => filterBy(state.budgetCategories, "budgetId", budgetId)
export const selectBudgetExpensesByTripId = (tripId: Id) => (state: State) => {
    const budget = findBy(state.budgets, "tripId", tripId)
    if (!budget) return []
    return filterBy(state.budgetExpenses, "budgetId", budget.id).map(deserializeExpense)
}
export const selectBudgetExpensesByBudgetId = (budgetId: Id) =>
    (state: State) => filterBy(state.budgetExpenses.map(deserializeExpense), "budgetId", budgetId);

export function selectBudgetCategoriesByTripId(tripId: Id) {
    return function (state: State): ReadonlyArray<BudgetCategory> {
        const budget = findBy(state.budgets, "tripId", tripId)
        if (!budget) return [];
        return filterBy(state.budgetCategories, "budgetId", budget.id);
    }
}
