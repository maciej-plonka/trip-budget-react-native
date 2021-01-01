import {Money} from "../../models/Money";
import {Color} from "../../models/Colors";

export type Budget = HasId & {
    tripId: number,
    totalBudget: Money,
}
export type BudgetCategory = HasId & {
    budgetId: number,
    name: string,
    color?: Color,
    categoryBudget: Money
}

export type BudgetExpense = HasId & {
    budgetId: number,
    categoryId?: number,
    value: Money,
    name: string,

}

export type BudgetState = {
    budgets: Readonly<Budget[]>,
    budgetCategories: Readonly<BudgetCategory[]>,
    budgetExpenses: Readonly<BudgetExpense[]>
}
export const initialBudgetState: BudgetState = {
    budgets: [],
    budgetCategories: [],
    budgetExpenses: []
}


export const sumCategoriesBudget = (categories: Readonly<BudgetCategory[]>): Money => categories.length
    ? ({
        currency: categories[0].categoryBudget.currency,
        amount: categories.map(it => it.categoryBudget).map(it => it.amount).reduce((a, b) => a + b, 0)
    })
    : ({currency: "¥", amount: 0})
