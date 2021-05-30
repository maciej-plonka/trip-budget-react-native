import {copyCurrency, Money, sumMoney} from "../../../../models";
import {BudgetCategory, BudgetExpense, sumBudgetExpenses} from "../../../../store/models";
import {useMemo} from "react";

type BudgetSpent = { spent: Money, total: Money }

const sortByBudget = (left: BudgetSpent, right: BudgetSpent) => {
    if (left.spent.amount == right.spent.amount)
        return right.total.amount - left.total.amount
    return right.spent.amount - left.spent.amount
}

export function useTotalBudgetCard(totalBudget: Money, budgetExpenses: ReadonlyArray<BudgetExpense>, budgetCategories: ReadonlyArray<BudgetCategory>) {
    const totalSpent = useMemo(() => sumBudgetExpenses(budgetExpenses), [budgetExpenses])
    const totalBudgetCategories = useMemo(() => {
        const categories = budgetCategories.map(category => ({
            name: category.name,
            spent: sumBudgetExpenses(budgetExpenses.filter(it => it.categoryId === category.id)),
            total: category.categoryBudget
        })).sort(sortByBudget)
        const totalFromOtherCategories = sumMoney(categories.map(it => it.total));
        const spentFromOtherCategories = sumMoney(categories.map(it => it.spent));
        const essentials = {
            name: "Essentials",
            spent: copyCurrency(totalSpent, Math.max(0, totalSpent.amount - spentFromOtherCategories.amount)),
            total: copyCurrency(totalBudget, Math.max(totalBudget.amount - totalFromOtherCategories.amount))
        }
        return [essentials, ...categories].filter(it => it.total.amount > 0)
    }, [totalSpent, totalBudget, budgetExpenses, budgetCategories])
    return {totalSpent, totalBudgetCategories}
}
