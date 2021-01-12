import {budgetReducer} from "./BudgetReducer"
import {tripReducer} from "./TripReducer"
import {combineReducers} from "redux";
import {wishReducer} from "./WishReducer";

export const rootReducer = combineReducers({
    trip: tripReducer,
    budget: budgetReducer,
    wish: wishReducer
})

export type RootReducer = typeof rootReducer
export type RootState = ReturnType<typeof rootReducer>
