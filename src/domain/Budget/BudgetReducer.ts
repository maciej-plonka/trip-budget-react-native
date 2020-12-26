import {Reducer} from "../../hooks/AsyncStorageReducer";
import {Budget} from "./Types";

type ReducerAction =
    { type: "create", newBudget: { tripId: number, value: Money } } |
    { type: "update", budgetToUpdate: Budget }

const BudgetReducer: Reducer<Budget[], ReducerAction> = (state, action) => {
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

export default BudgetReducer;
