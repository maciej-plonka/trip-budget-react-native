import {HasId, Id} from "../BaseTypes";
import {Money, sumMoney} from "../../models";


export type Budget = HasId & {
    tripId: Id,
    totalBudget: Money,
}

export type NewBudget = Omit<Budget, "id">

export type BudgetCategory = HasId & {
    budgetId: Id,
    name: string,
    categoryBudget: Money
}

export type NewBudgetCategory = {
    budgetId: Id,
    name: string,
    categoryBudget: Money,
}

export type BudgetExpense = HasId & {
    budgetId: Id,
    categoryId?: Id,
    date: Date,
    value: Money,
    name: string,
}

export type SerializedBudgetExpense = Omit<BudgetExpense, "date"> & {
    date: number,
}

export type NewBudgetExpense = {
    budgetId: Id,
    categoryId?: Id,
    value: Money,
    name: string,
}

export const sumCategoriesBudget = (categories: ReadonlyArray<BudgetCategory>): Money => sumMoney(categories.map(it => it.categoryBudget))
export const sumBudgetExpenses = (expenses: ReadonlyArray<BudgetExpense>): Money => sumMoney(expenses.map(it => it.value))

export const serializeExpense = (expense: BudgetExpense): SerializedBudgetExpense => ({
    ...expense,
    date: expense.date.getTime()
})

export const deserializeExpense = (expense: SerializedBudgetExpense): BudgetExpense => ({
    ...expense,
    date: new Date(expense.date)
})
