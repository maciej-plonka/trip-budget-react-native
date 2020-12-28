import {budgetReducer } from "./BudgetReducer"
import {tripReducer } from "./TripReducer"
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    trips: tripReducer,
    budgets: budgetReducer
})

export type RootReducer = typeof rootReducer
export type RootState = ReturnType<typeof rootReducer>
