import {HasId, Id} from "../BaseTypes";
import {buildMoney, defaultMoney, Money, sumMoney} from "../../models/Money";
import {sumBy} from "../../utils/Collections";

export type BudgetCategory = HasId & {
    tripId: Id,
    name: string,
    categoryBudget: Money
}

export type NewBudgetCategory = {
    tripId: Id,
    name: string,
    categoryBudget: Money,
}

export type BudgetExpense = HasId & {
    tripId: Id,
    categoryId?: Id,
    value: Money,
    name: string,
}

export type NewBudgetExpense = {
    tripId: Id,
    categoryId?: Id,
    value: Money,
    name: string,
}

export const sumCategoriesBudget = (categories: ReadonlyArray<BudgetCategory>): Money => sumMoney(categories.map(it => it.categoryBudget))
export const sumBudgetExpenses = (expenses: ReadonlyArray<BudgetExpense>): Money => sumMoney(expenses.map(it => it.value))
