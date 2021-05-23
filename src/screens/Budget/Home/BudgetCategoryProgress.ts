import {Money, sumMoney} from "../../../models";
import {BudgetCategory, BudgetExpense} from "../../../store/models";
import {filterBy} from "../../../utils/Collections";

export type BudgetCategoryProgress = {
    name: string,
    budget: Money,
    spent: Money
}

export function associateCategoryWithExpenses(category: BudgetCategory, expenses: ReadonlyArray<BudgetExpense>): BudgetCategoryProgress {
    return {
        name: category.name,
        budget: category.categoryBudget,
        spent: sumMoney(filterBy(expenses, "categoryId", category.id).map(it => it.value))
    }
}
