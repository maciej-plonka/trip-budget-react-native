import {filterBy, findBy} from "../../utils/Collections";
import {State} from "../State";
import {Id} from "../BaseTypes";
import {deserializeExpense} from "../models";

export const selectBudgetCategoryById = (id: Id) => (state: State) => findBy(state.budgetCategories, "id", id);
export const selectBudgetExpenseById = (id: Id) => (state: State) => findBy(state.budgetExpenses.map(deserializeExpense), "id", id);
export const selectBudgetCategoriesByTripId = (tripId: Id) => (state: State) => filterBy(state.budgetCategories, "tripId", tripId)
export const selectBudgetExpensesByTripId = (tripId: Id) => (state: State) => filterBy(state.budgetExpenses.map(deserializeExpense), "tripId", tripId);
