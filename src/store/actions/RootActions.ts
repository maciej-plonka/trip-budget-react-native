import {BudgetAction, createBudget, createBudgetCategory, deleteBudgetByTripId} from "./BudgetActions";
import {createTrip, deleteTrip, TripAction} from "./TripActions";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers";
import {Budget, BudgetCategory} from "../states";
import {Money} from "../../models/Money";
import {createWish, deleteWishByTripId, WishAction} from "./WishActions";
import {HasId} from "../BaseTypes";

type RootThunkAction = ThunkAction<void, RootState, void, TripAction | BudgetAction | WishAction>

const lastId = <T extends HasId>(items: Readonly<T[]>) => items.map(it => it.id).reduce((a, b) => a > b ? a : b, 0);

export const createFullTrip = (fullTrip: {
    name: string,
    startDate: Date,
    endDate: Date,
    totalBudget: Money,
}): RootThunkAction => (dispatch, getState) => {
    const newId = lastId(getState().trip.trips) + 1
    dispatch(createTrip({...fullTrip, id: newId}))
    dispatch(createBudgetWithUniqueId({...fullTrip, tripId: newId}))
}

export const createBudgetWithUniqueId = (data: { tripId: number, totalBudget: Money }): RootThunkAction => (dispatch, getState) => {
    const newId = lastId(getState().budget.budgets) + 1
    const budget: Budget = {...data, id: newId}
    dispatch(createBudget(budget))
}

export const createBudgetCategoryWithUniqueId = (data: { name: string, budgetId: number, categoryBudget: Money }): RootThunkAction => (dispatch, getState) => {
    const newId = lastId(getState().budget.budgetCategories) + 1
    const budgetCategory: BudgetCategory = {...data, id: newId}
    dispatch(createBudgetCategory(budgetCategory))
}

export const createWishWithUniqueId = (data: {
    tripId: number,
    budgetCategoryId?: number,
    name: string,
    comments: string,
    targetValue: Money
}): RootThunkAction => (dispatch, getState) => {
    const newId = lastId(getState().wish.wishes) + 1
    const newItem = {...data, id: newId}
    dispatch(createWish(newItem));
}

export const deleteFullTrip = (tripId: number): RootThunkAction => (dispatch) => {
    dispatch(deleteWishByTripId(tripId))
    dispatch(deleteBudgetByTripId(tripId))
    dispatch(deleteTrip(tripId))
}
