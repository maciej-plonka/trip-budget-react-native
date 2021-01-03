import {RootState} from "../reducers";
import {filterBy, findBy} from "../../utils/Collections";

export const selectBudgetByTripId = (tripId: number) => (state: RootState) => findBy(state.budget.budgets, "tripId", tripId);
export const selectBudgetById = (id: number) => (state: RootState) => findBy(state.budget.budgets,"id", id)
export const selectBudgetCategoriesByBudgetId = (id: number) => (state: RootState) => filterBy(state.budget.budgetCategories,"budgetId",id)
export const selectBudgetCategoryById = (id: number) => (state: RootState) => findBy(state.budget.budgetCategories,"id",id);
export const selectExpenseById = (id: number) => (state: RootState) => findBy(state.budget.budgetExpenses,"id",id);
