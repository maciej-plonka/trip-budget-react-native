import React from "react";
import {Budget, sumCategoriesBudget} from "../../store/states";
import {Progress} from "./Progress";
import {useSelector} from "react-redux";
import {selectBudgetCategoriesByBudgetId} from "../../store/selectors";

type Props = {
    budget: Readonly<Budget>,
    label?: string,
    onPress?: () => void
}

const BudgetProgress = ({budget, label = "Budget", onPress}: Props) => {
    const categories = useSelector(selectBudgetCategoriesByBudgetId(budget.id))
    return (
        <Progress label={label}
                  onPress={onPress}
                  currentValue={sumCategoriesBudget(categories)}
                  maxValue={budget.totalBudget}
                  spaceBelow
        />
    )
}
export default BudgetProgress;
