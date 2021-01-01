import {RootState} from "../reducers";

export const selectBudgetByTripId = (tripId: number) => (state: RootState) => state.budget.budgets.find(it => it.tripId === tripId)
export const selectBudgetById = (id: number) => (state: RootState) => state.budget.budgets.find(it => it.id === id)
export const selectBudgetCategoriesByBudgetId = (id:number) => (state:RootState) => state.budget.budgetCategories.filter(it => it.budgetId === id)
