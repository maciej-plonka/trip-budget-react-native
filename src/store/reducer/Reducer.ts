import {existsBy, filterOutBy, findBy} from "../../utils/Collections";
import {initialState, State} from "../State";
import {BudgetCategory, BudgetExpense, serializeExpense, serializeTrip} from "../models";
import "react-native-get-random-values"
import {StateAction} from "../actions";
import {
    CreateBudgetAction,
    CreateBudgetCategoryAction,
    CreateBudgetExpenseAction,
    DeleteBudgetByIdAction,
    DeleteBudgetExpenseByIdAction, UpdateBudgetAction,
    UpdateBudgetCategoryAction,
    UpdateBudgetExpenseAction
} from "../actions/BudgetActions";
import {CreateTripAction, DeleteTripAction, UpdateTripAction} from "../actions/TripActions";
import {assignId, updateItem} from "./ReducerUtils";

export function stateReducer(state: State = initialState, action: StateAction): State {
    switch (action.type) {
        case "create_trip":
            return handleCreateTripAction(state, action);
        case "update_trip":
            return handleUpdateTripAction(state, action);
        case "delete_trip":
            return handleDeleteTripAction(state, action);
        case "create_budget":
            return handleCreateBudgetAction(state, action);
        case "update_budget":
            return handleUpdateBudgetAction(state, action);
        case "create_budget_category":
            return handleCreateBudgetCategoryAction(state, action);
        case "update_budget_category":
            return handleUpdateBudgetCategoryAction(state, action);
        case "create_budget_expense":
            return handleCreateBudgetExpenseAction(state, action);
        case "update_budget_expense":
            return handleUpdateBudgetExpenseAction(state, action);
        case "delete_budget_expense_by_id":
            return handleDeleteBudgetExpenseByIdAction(state, action);
        case "delete_budget_category_by_id":
            return handleDeleteBudgetByIdAction(state, action);

        case "create_wish": {
            return {...state, wishes: [...state.wishes, assignId(action.newWish)]}
        }
        case "update_wish": {
            return {...state, wishes: updateItem(state.wishes, action.item)}
        }
        case "delete_wish_by_id": {
            return {...state, wishes: filterOutBy(state.wishes, "id", action.id)}
        }
        case "buy_wish": {
            const expense: BudgetExpense = assignId({
                budgetId: action.budgetId,
                categoryId: action.wish.budgetCategoryId,
                name: action.wish.name,
                date: new Date(),
                value: action.actualValue
            })
            return {
                ...state,
                budgetExpenses: [...state.budgetExpenses, serializeExpense(expense)],
                wishes: updateItem(state.wishes, {...action.wish, budgetExpenseId: expense.id})
            }
        }
    }
    return state;
}

function handleCreateTripAction(state: State, action: CreateTripAction) {
    return {...state, trips: [...state.trips, serializeTrip(assignId(action.trip))]}
}

function handleUpdateTripAction(state: State, action: UpdateTripAction) {
    return {...state, trips: updateItem(state.trips, serializeTrip(action.trip))}
}

function handleDeleteTripAction(state: State, action: DeleteTripAction) {
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

function handleCreateBudgetAction(state: State, action: CreateBudgetAction) {
    if (existsBy(state.budgets, "tripId", action.newBudget.tripId)) {
        return state;
    }
    const budget = assignId(action.newBudget)
    const categories: BudgetCategory[] = action.newCategories.map(it => assignId({
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

function handleUpdateBudgetAction(state: State, action: UpdateBudgetAction) {
    return {
        ...state,
        budgets: updateItem(state.budgets, action.budget)
    }
}


function handleCreateBudgetCategoryAction(state: State, action: CreateBudgetCategoryAction) {
    return {...state, budgetCategories: [...state.budgetCategories, assignId(action.newCategory)]}
}

function handleUpdateBudgetCategoryAction(state: State, action: UpdateBudgetCategoryAction) {
    return {...state, budgetCategories: updateItem(state.budgetCategories, action.category)}
}

function handleCreateBudgetExpenseAction(state: State, action: CreateBudgetExpenseAction) {
    const newExpense = assignId({...action.newExpense, date: new Date()});
    return {...state, budgetExpenses: [...state.budgetExpenses, serializeExpense(newExpense)]}
}

function handleUpdateBudgetExpenseAction(state: State, action: UpdateBudgetExpenseAction) {
    return {...state, budgetExpenses: updateItem(state.budgetExpenses, serializeExpense(action.expense))}
}

function handleDeleteBudgetExpenseByIdAction(state: State, action: DeleteBudgetExpenseByIdAction) {
    const wish = findBy(state.wishes, "budgetExpenseId", action.id)
    return {
        ...state,
        budgetExpenses: filterOutBy(state.budgetExpenses, "id", action.id),
        wishes: wish ? updateItem(state.wishes, {...wish, budgetExpenseId: undefined}) : state.wishes
    }
}

function handleDeleteBudgetByIdAction(state: State, action: DeleteBudgetByIdAction) {
    return {
        ...state,
        budgetCategories: filterOutBy(state.budgetCategories, "id", action.id),
        budgetExpenses: filterOutBy(state.budgetExpenses, "categoryId", action.id)
    }
}

