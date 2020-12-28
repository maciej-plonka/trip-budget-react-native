import {BudgetAction, createBudget} from "./BudgetActions";
import {createTrip, TripAction} from "./TripActions";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers";
import {Budget, Trip} from "../states";


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


export const createFullTrip = (fullTrip: NewFullTrip): RootThunkAction => (dispatch, getState) => {
    const newId = getState().trips.trips.map(it => it.id).reduce((a, b) => a > b ? a : b, 0) + 1
    const newTrip: Trip = {...fullTrip, id: newId}
    dispatch(createTrip(newTrip))
    dispatch(createBudgetWithUniqueId({...fullTrip, tripId: newId}))
}

export const createBudgetWithUniqueId = (data: { tripId: number, value: Money }): RootThunkAction => (dispatch, getState) => {
    const lastId = getState().budgets.budgets.map(it => it.id).reduce((a, b) => a > b ? a : b, 0) + 1
    const budget: Budget = {
        ...data,
        id: lastId,
        categories: [],
    }
    dispatch(createBudget(budget))
}
