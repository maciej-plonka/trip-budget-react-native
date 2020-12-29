import {RootState} from "../reducers";

export const selectBudgetByTripId = (tripId: number) => (state: RootState) => state.budgets.budgets.find(it => it.tripId === tripId)
export const selectBudgetById = (id: number) => (state: RootState) => state.budgets.budgets.find(it => it.id === id)
