import {BudgetState, initialBudgetState} from "../states";
import {BudgetAction} from "../actions";

const updateItem = <T extends HasId>(collection: Readonly<T[]>, newV: T): Readonly<T[]> => {
    return collection.map(it => it.id === newV.id ? newV : it)
}
const deleteBudgetById = (state: BudgetState, id: number): BudgetState => {
    return {
        ...state,
        budgets: state.budgets.filter(it => it.id !== id),
        budgetCategories: state.budgetCategories.filter(it => it.budgetId !== id),
        budgetExpenses: state.budgetExpenses.filter(it => it.budgetId !== id)
    }
}

export const budgetReducer = (state: BudgetState = initialBudgetState, action: BudgetAction): BudgetState => {
    switch (action.type) {
        case "create_budget":
            return {...state, budgets: [...state.budgets, action.budget]}
        case "update_budget":
            return {...state, budgets: updateItem(state.budgets, action.budget)}
        case "delete_budget_by_trip_id": {
            const budgetToDelete = state.budgets.find(it => it.tripId === action.tripId)
            return budgetToDelete
                ? deleteBudgetById(state, budgetToDelete.id)
                : state
        }

        case "delete_budget_category_by_id":
            return {
                ...state,
                budgetCategories: state.budgetCategories.filter(it => it.id !== action.id),
                budgetExpenses: state.budgetExpenses.filter(it => it.categoryId !== action.id)
            }
        case "create_budget_category":
            return {...state, budgetCategories: [...state.budgetCategories, action.category]}
        case "update_budget_category":
            return {...state, budgetCategories: updateItem(state.budgetCategories, action.category)}
    }
    return state;
}
