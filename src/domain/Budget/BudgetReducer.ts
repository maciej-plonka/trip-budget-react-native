import {Reducer, useAsyncStorageReducer} from "../../hooks/AsyncStorageReducer";
import {Budget} from "./Types";
import BudgetSerializer from "./BudgetSerializer";

export type BudgetAction =
    { type: "create", newBudget: { tripId: number, value: Money } } |
    { type: "update", budgetToUpdate: Budget }

const BudgetReducer: Reducer<Budget[], BudgetAction> = (state, action) => {
    switch (action.type) {
        case "create": {
            const nextId = state.map(it => it.id).reduce((a, b) => a > b ? a : b, 0) + 1
            const budget: Budget = {
                ...action.newBudget,
                id: nextId,
                categories: []
            }
            return [...state, budget]
        }
        case "update": {
            const toUpdate = action.budgetToUpdate
            return state.map(it => it.id === toUpdate.id ? toUpdate : it)
        }
    }
    return state
}


export const useBudgetReducer = () => useAsyncStorageReducer("budgets", BudgetReducer, [], BudgetSerializer);
