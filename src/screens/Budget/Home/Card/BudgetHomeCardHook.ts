import {Money, sortMoneyDesc, sumMoney} from "../../../../models/Money";
import {CategoryExpense} from "../BudgetHomeHook";
import {useElementDimensions} from "../../../../hooks/ElementDimensions";
import {sortBy} from "../../../../utils/Collections";
import {useRandomColor} from "./RandomColor";

const subBudgetItemOffset = 16

export const useBudgetHomeCard = (totalBudget: Money, totalBudgetSpent: Money, categoryExpenses: ReadonlyArray<CategoryExpense>) => {
    const {dimensions, onLayout} = useElementDimensions()
    const sortedCategoryExpenses = sortBy(categoryExpenses, it => it.category.categoryBudget, sortMoneyDesc)
    const randomColor = useRandomColor()
    const itemWidth = !sortedCategoryExpenses.length || !dimensions ? 0 : dimensions.width / 3 - subBudgetItemOffset
    return {
        onLayout,
        itemWidth,
        mainItem: {color: randomColor(), current: totalBudgetSpent.amount, max: totalBudget.amount, name: "Budget"},
        items: sortedCategoryExpenses.slice(0, 3).map(categoryExpense => ({
            name: categoryExpense.category.name,
            color: randomColor(),
            current: sumMoney(categoryExpense.expenses.map(it => it.value)).amount,
            max: categoryExpense.category.categoryBudget.amount,
        })),
    }
}
