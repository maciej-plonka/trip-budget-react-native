import {Action} from "redux"
import {Budget, BudgetCategory} from "../states";

export type BudgetAction =
    (Action<"create_budget"> & { budget: Budget }) |
    (Action<"update_budget"> & { budget: Budget }) |
    (Action<"delete_budget_by_trip_id"> & { tripId: number }) |
    (Action<"create_budget_category"> & { category: BudgetCategory }) |
    (Action<"update_budget_category"> & { category: BudgetCategory }) |
    (Action<"delete_budget_category_by_id"> & { id: number })

export const createBudget = (budget: Budget): BudgetAction => ({type: "create_budget", budget})

export const updateBudget = (budget: Budget): BudgetAction => ({type: "update_budget", budget})
export const deleteBudgetByTripId = (tripId: number): BudgetAction => ({type: "delete_budget_by_trip_id", tripId})
export const createBudgetCategory = (category: BudgetCategory): BudgetAction => ({
    type: "create_budget_category",
    category
})
export const updateBudgetCategory = (category: BudgetCategory): BudgetAction => ({
    type: "update_budget_category",
    category
})
export const deleteBudgetCategoryById = (id: number):BudgetAction => ({type: "delete_budget_category_by_id", id})
