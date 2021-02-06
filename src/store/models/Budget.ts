import {HasId, Id} from "../BaseTypes";
import {buildMoney, defaultMoney, Money} from "../../models/Money";
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

export const sumCategoriesBudget = (categories: Readonly<BudgetCategory[]>): Money => categories.length
    ? buildMoney(sumBy(categories, it => it.categoryBudget.amount),categories[0].categoryBudget.currency)
    : defaultMoney()
