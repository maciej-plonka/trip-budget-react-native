import {budgetReducer} from "./BudgetReducer"
import {tripReducer} from "./TripReducer"
import {combineReducers} from "redux";
import {shoppingListReducer} from "./ShoppingListReducer";

export const rootReducer = combineReducers({
    trip: tripReducer,
    budget: budgetReducer,
    shoppingList: shoppingListReducer
})

export type RootReducer = typeof rootReducer
export type RootState = ReturnType<typeof rootReducer>
