import {BudgetState, initialBudgetState} from "../states";
import {BudgetAction} from "../actions";

export const budgetReducer = (state: BudgetState = initialBudgetState, action: BudgetAction): BudgetState => {
    switch (action.type) {
        case "create_budget":
            return {...state, budgets: [...state.budgets, action.budget]}
        case "update_budget":
            return {...state, budgets: state.budgets.map(it => it.id === action.budget.id ? action.budget : it)}
    }
    return state;
}
