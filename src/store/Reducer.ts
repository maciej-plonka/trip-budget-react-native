import {filterOutBy, findBy} from "../utils/Collections";
import {initialState, State} from "./State";
import {BudgetCategory, BudgetExpense, serializeExpense, serializeTrip} from "./models";
import {HasId, Id} from "./BaseTypes";
import "react-native-get-random-values"
import {nanoid} from "nanoid";
import {StateAction} from "./actions";

function updateItem<T extends HasId>(collection: ReadonlyArray<T>, newV: T): ReadonlyArray<T> {
    return collection.map(it => it.id === newV.id ? newV : it)
}

function uniqueId(): Id {
    return nanoid();
}

export function stateReducer(state: State = initialState, action: StateAction): State {
    switch (action.type) {
        case "update_trip": {
            return {...state, trips: updateItem(state.trips, serializeTrip(action.trip))}
        }
        case "create_trip": {
            const newTrip = {...action.trip, id: uniqueId()};
            return {...state, trips: [...state.trips, serializeTrip(newTrip)]}
        }
        case "delete_trip": {
            const tripId = action.tripId;
            const budget = findBy(state.budgets, "tripId", tripId);
            return {
                ...state,
                trips: filterOutBy(state.trips, "id", tripId),
                budgetCategories: budget ? filterOutBy(state.budgetCategories, "budgetId", budget.id) : state.budgetCategories,
                budgetExpenses: budget ? filterOutBy(state.budgetExpenses, "budgetId", tripId) : state.budgetExpenses,
                wishes: filterOutBy(state.wishes, "tripId", tripId),
            }
        }

        case "create_budget": {
            const exists = !!findBy(state.budgets, "tripId", action.newBudget.tripId);
            if (exists) return state;
            const budget = {...action.newBudget, id: uniqueId()}
            const categories: BudgetCategory[] = action.newCategories.map(it => ({
                id: uniqueId(),
                name: it.name,
                categoryBudget: it.categoryBudget,
                budgetId: budget.id
            }));
            return {
                ...state,
                budgets: [...state.budgets, budget],
                budgetCategories: [...state.budgetCategories, ...categories],
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
            const newExpense = {...action.newExpense, date: new Date(), id: uniqueId()};
            return {...state, budgetExpenses: [...state.budgetExpenses, serializeExpense(newExpense)]}
        }
        case "update_budget_expense": {
            return {...state, budgetExpenses: updateItem(state.budgetExpenses, serializeExpense(action.expense))}
        }
        case "delete_budget_expense_by_id": {
            const wish = findBy(state.wishes, "budgetExpenseId", action.id)
            return {
                ...state,
                budgetExpenses: filterOutBy(state.budgetExpenses, "id", action.id),
                wishes: wish ? updateItem(state.wishes, {...wish, budgetExpenseId: undefined}) : state.wishes
            }
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
            const {budgetCategoryId, name} = action.wish

            const expense: BudgetExpense = {
                id: uniqueId(),
                budgetId: action.budgetId,
                categoryId: budgetCategoryId,
                name,
                date: new Date(),
                value: action.actualValue
            }
            return {
                ...state,
                budgetExpenses: [...state.budgetExpenses, serializeExpense(expense)],
                wishes: updateItem(state.wishes, {...action.wish, budgetExpenseId: expense.id})
            }
        }


    }
    return state;
}
