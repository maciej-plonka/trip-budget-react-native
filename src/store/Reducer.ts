import {filterBy, filterOutBy} from "../utils/Collections";
import {initialState, State} from "./State";
import {BudgetExpense, serialize} from "./models";
import {HasId, Id} from "./BaseTypes";
import "react-native-get-random-values"
import {nanoid} from "nanoid";
import {StateAction} from "./actions";

const updateItem = <T extends HasId>(collection: Readonly<T[]>, newV: T): Readonly<T[]> => {
    return collection.map(it => it.id === newV.id ? newV : it)
}

const uniqueId = (): Id => nanoid()

export const stateReducer = (state: State = initialState, action: StateAction): State => {
    switch (action.type) {
        case "update_trip": {
            return {...state, trips: updateItem(state.trips, serialize(action.trip))}
        }
        case "create_trip": {
            const newTrip = {...action.trip, id: uniqueId()};
            return {...state, trips: [...state.trips, serialize(newTrip)]}
        }
        case "delete_trip": {
            return {
                ...state,
                trips: filterOutBy(state.trips, "id", action.tripId),
                budgetCategories: filterOutBy(state.budgetCategories, "tripId", action.tripId),
                budgetExpenses: filterOutBy(state.budgetExpenses, "tripId", action.tripId),
                wishes: filterOutBy(state.wishes, "tripId", action.tripId),
            }
        }
        case "create_budget_category": {
            const newCategory = {...action.newCategory, id: uniqueId()};
            return {...state, budgetCategories: [...state.budgetCategories, newCategory]}
        }
        case "update_budget_category": {
            return {...state, budgetCategories: updateItem(state.budgetCategories, action.category)}
        }
        case "create_budget_expense": {
            const newExpense = {...action.newExpense, id: uniqueId()};
            return {...state, budgetExpenses: [...state.budgetExpenses, newExpense]}
        }
        case "delete_budget_category_by_id": {
            return {
                ...state,
                budgetCategories: filterOutBy(state.budgetCategories, "id", action.id),
                budgetExpenses: filterOutBy(state.budgetExpenses, "categoryId", action.id)
            }
        }
        case "create_wish": {
            const newWish = {...action.newWish, id: uniqueId()};
            return {...state, wishes: [...state.wishes, newWish]}
        }
        case "update_wish": {
            return {...state, wishes: updateItem(state.wishes, action.item)}
        }
        case "delete_wish_by_id": {
            return {...state, wishes: filterOutBy(state.wishes, "id", action.id)}
        }
        case "buy_wish": {
            const {tripId, budgetCategoryId: categoryId, name} = action.wish
            const expense: BudgetExpense = {
                id: uniqueId(),
                tripId,
                categoryId,
                name,
                value: action.actualValue
            }
            return {
                ...state,
                budgetExpenses: [...state.budgetExpenses, expense],
                wishes: updateItem(state.wishes, {...action.wish, budgetExpenseId: expense.id})
            }
        }


    }
    return state;
}

