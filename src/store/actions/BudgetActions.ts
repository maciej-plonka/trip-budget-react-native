import {Action} from "redux"
import {BudgetCategory, BudgetExpense, NewBudgetCategory, NewBudgetExpense} from "../models";
import {Id} from "../BaseTypes";

export type BudgetAction =
    (Action<"create_budget_category"> & { newCategory: NewBudgetCategory }) |
    (Action<"update_budget_category"> & { category: BudgetCategory }) |
    (Action<"delete_budget_category_by_id"> & { id: Id }) |
    (Action<"create_budget_expense">) & { newExpense: NewBudgetExpense } |
    (Action<"update_budget_expense">) & { expense: BudgetExpense } |
    (Action<"delete_budget_expense_by_id">) & {id: Id }

export const createBudgetCategory = (newCategory: NewBudgetCategory): BudgetAction => ({
    type: "create_budget_category",
    newCategory
})
export const updateBudgetCategory = (category: BudgetCategory): BudgetAction => ({
    type: "update_budget_category",
    category
})
export const deleteBudgetCategoryById = (id: Id): BudgetAction => ({type: "delete_budget_category_by_id", id})
export const createBudgetExpense = (newExpense: NewBudgetExpense): BudgetAction => ({
    type: "create_budget_expense",
    newExpense
})
export const updateBudgetExpense = (expense: BudgetExpense): BudgetAction => ({type: "update_budget_expense", expense})
export const deleteBudgetExpenseById = (id: Id) :BudgetAction => ({type: "delete_budget_expense_by_id", id})
