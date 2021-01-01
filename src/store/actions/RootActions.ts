import {BudgetAction, createBudget, createBudgetCategory, deleteBudgetByTripId} from "./BudgetActions";
import {createTrip, deleteTrip, TripAction} from "./TripActions";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers";
import {Budget, BudgetCategory, Trip} from "../states";
import {Money} from "../../models/Money";


type NewTrip = {
    name: string,
    startDate: Date,
    endDate: Date
}
type NewBudget = {
    value: Money,
}
type NewFullTrip = NewTrip & NewBudget

type RootThunkAction = ThunkAction<void, RootState, void, TripAction | BudgetAction>

const lastId = <T extends HasId>(items: Readonly<T[]>) => items.map(it => it.id).reduce((a, b) => a > b ? a : b, 0);

export const createFullTrip = (fullTrip: NewFullTrip): RootThunkAction => (dispatch, getState) => {
    const newId = lastId(getState().trip.trips) + 1
    const newTrip: Trip = {...fullTrip, id: newId}
    dispatch(createTrip(newTrip))
    dispatch(createBudgetWithUniqueId({...fullTrip, tripId: newId}))
}

export const createBudgetWithUniqueId = (data: { tripId: number, value: Money }): RootThunkAction => (dispatch, getState) => {
    const newId = lastId(getState().budget.budgets) + 1
    const budget: Budget = {id: newId, tripId: data.tripId, totalBudget: data.value}
    dispatch(createBudget(budget))
}

export const createBudgetCategoryWithUniqueId = (data: { name: string, budgetId: number, categoryBudget: Money }): RootThunkAction => (dispatch, getState) => {
    const newId = lastId(getState().budget.budgetCategories) + 1
    const budgetCategory: BudgetCategory = {...data, id: newId}
    dispatch(createBudgetCategory(budgetCategory))
}

export const deleteFullTrip = (tripId: number): RootThunkAction => (dispatch) => {
    dispatch(deleteBudgetByTripId(tripId))
    dispatch(deleteTrip(tripId))
}
