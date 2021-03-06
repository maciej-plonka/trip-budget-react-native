import {filterBy, findBy} from "../../utils/Collections";
import {State} from "../State";
import {Id} from "../BaseTypes";
import {deserializeExpense} from "../models";

export const selectBudgetByTripId = (tripId:Id) => (state: State) => findBy(state.budgets, "tripId", tripId)
export const selectBudgetById = (id: Id) => (state: State) => findBy(state.budgets, "id", id);
export const selectBudgetCategoryById = (id: Id) => (state: State) => findBy(state.budgetCategories, "id", id);
export const selectBudgetExpenseById = (id: Id) => (state: State) => findBy(state.budgetExpenses.map(deserializeExpense), "id", id);
export const selectBudgetCategoriesByBudgetId = (tripId: Id) =>
    (state: State) => filterBy(state.budgetCategories, "budgetId", tripId)
export const selectBudgetExpensesByBudgetId = (budgetId: Id)  =>
    (state: State) => filterBy(state.budgetExpenses.map(deserializeExpense), "budgetId", budgetId);
