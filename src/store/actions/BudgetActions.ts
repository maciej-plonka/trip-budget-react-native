import {Action} from "redux"
import {
    BudgetCategory,
    BudgetExpense,
    NewBudget,
    NewExistingBudgetCategory,
    NewBudgetExpense,
    NewBudgetCategory
} from "../models";
import {Id} from "../BaseTypes";
import {State} from "../State";
import {StateAction} from "./StateActions";

export type CreateBudgetAction = Action<"create_budget"> & { newBudget: NewBudget, newCategories: NewBudgetCategory[] };
export type CreateBudgetCategoryAction = Action<"create_budget_category"> & { newCategory: NewExistingBudgetCategory };
export type UpdateBudgetCategoryAction = Action<"update_budget_category"> & { category: BudgetCategory };
export type DeleteBudgetByIdAction = Action<"delete_budget_category_by_id"> & { id: Id };
export type CreateBudgetExpenseAction = (Action<"create_budget_expense">) & { newExpense: NewBudgetExpense };
export type UpdateBudgetExpenseAction = (Action<"update_budget_expense">) & { expense: BudgetExpense };
export type DeleteBudgetExpenseByIdAction = (Action<"delete_budget_expense_by_id">) & { id: Id };
export type BudgetAction =
    CreateBudgetAction |
    CreateBudgetCategoryAction |
    UpdateBudgetCategoryAction |
    DeleteBudgetByIdAction |
    CreateBudgetExpenseAction |
    UpdateBudgetExpenseAction |
    DeleteBudgetExpenseByIdAction

export const createBudget = (newBudget: NewBudget, newCategories: NewBudgetCategory[]): CreateBudgetAction => ({
    type: "create_budget",
    newBudget,
    newCategories
})

export const createBudgetCategory = (newCategory: NewExistingBudgetCategory): CreateBudgetCategoryAction => ({
    type: "create_budget_category",
    newCategory
})
export const updateBudgetCategory = (category: BudgetCategory): UpdateBudgetCategoryAction => ({
    type: "update_budget_category",
    category
})
export const deleteBudgetCategoryById = (id: Id): DeleteBudgetByIdAction => ({type: "delete_budget_category_by_id", id})

export const createBudgetExpense = (newExpense: NewBudgetExpense): CreateBudgetExpenseAction => ({
    type: "create_budget_expense",
    newExpense
})
export const updateBudgetExpense = (expense: BudgetExpense): UpdateBudgetExpenseAction => ({
    type: "update_budget_expense",
    expense
})

export const deleteBudgetExpenseById = (id: Id): DeleteBudgetExpenseByIdAction => ({
    type: "delete_budget_expense_by_id",
    id
})



