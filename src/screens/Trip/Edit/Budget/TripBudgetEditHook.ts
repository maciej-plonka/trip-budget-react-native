import {Money} from "../../../../models/Money";
import {BudgetCategory} from "../../../../store/states";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId, selectBudgetCategoriesByBudgetId} from "../../../../store/selectors";
import {useState} from "react";
import {createBudgetCategoryWithUniqueId} from "../../../../store/actions";

type BudgetEdit = {
    totalBudget: Money,
    setTotalBudget(totalBudget: Money): void,
    categories: Readonly<BudgetCategory[]>
    addCategory(name: string): void
    selectedCategory: BudgetCategory | null
    selectCategory(category: BudgetCategory | null): void,
    update(): void,
}
export const useTripBudgetEdit = (tripId: number): BudgetEdit | undefined => {
    const dispatch = useDispatch()
    const budget = useSelector(selectBudgetByTripId(tripId))
    if (!budget) {
        return;
    }
    const categories = useSelector(selectBudgetCategoriesByBudgetId(budget.id));
    const [totalBudget, setTotalBudget] = useState<Money>(budget.totalBudget);
    const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null)

    const addCategory = (name: string) => {
        const budgetCategory = {
            budgetId: budget.id,
            categoryBudget: {amount: 0, currency: budget.totalBudget.currency},
            name
        }
        dispatch(createBudgetCategoryWithUniqueId(budgetCategory))
    }
    const selectCategory = (category: BudgetCategory | null) => setSelectedCategory(category && JSON.parse(JSON.stringify(category)));
    const update = () => {

    }

    return {
        totalBudget, setTotalBudget,
        categories, addCategory,
        selectedCategory, selectCategory,
        update
    }
}
