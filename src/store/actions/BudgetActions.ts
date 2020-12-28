import {Action} from "redux"
import {Budget} from "../states";

export type BudgetAction =
    (Action<"create_budget"> & {budget: Budget}) |
    (Action<"update_budget"> & {budget: Budget})

export const createBudget = (budget: Budget): BudgetAction => ({type: "create_budget", budget})

export const updateBudget = (budget: Budget): BudgetAction => ({type: "update_budget", budget})
