import {Action} from "redux"
import {Budget} from "../states";

export type BudgetAction =
    (Action<"create_budget"> & { budget: Budget }) |
    (Action<"update_budget"> & { budget: Budget }) |
    (Action<"delete_budget_by_trip_id"> & { tripId: number })

export const createBudget = (budget: Budget): BudgetAction => ({type: "create_budget", budget})

export const updateBudget = (budget: Budget): BudgetAction => ({type: "update_budget", budget})
export const deleteBudgetByTripId = (tripId: number): BudgetAction => ({type: "delete_budget_by_trip_id", tripId})
