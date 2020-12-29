import {BudgetState, initialBudgetState} from "../states";
import {BudgetAction} from "../actions";

export const budgetReducer = (state: BudgetState = initialBudgetState, action: BudgetAction): BudgetState => {
    switch (action.type) {
        case "create_budget":
            return {...state, budgets: [...state.budgets, action.budget]}
        case "update_budget":
            return {...state, budgets: state.budgets.map(it => it.id === action.budget.id ? action.budget : it)}
        case "delete_budget_by_trip_id":
            return {...state, budgets: state.budgets.filter(it => it.tripId !== action.tripId)}
    }
    return state;
}
