import {BudgetCategory} from "../../../store/states";
import {Money} from "../../../models/Money";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId, selectBudgetCategoriesByBudgetId} from "../../../store/selectors";
import {useState} from "react";
import {createShoppingListItemWithUniqueId} from "../../../store/actions";

type CreateShoppingListItem = {
    imageId: string | undefined,
    setImageId(imageId: string | undefined): void
    categories: Readonly<BudgetCategory[]>
    category: BudgetCategory | undefined
    setCategory(category: BudgetCategory | undefined): void
    targetValue: Money
    setTargetValue(value: Money): void
    name: string
    setName(name: string): void
    comments: string
    setComments(comments: string): void
    create(): void,
}

export const useNewShoppingListItem = (tripId: number): CreateShoppingListItem | undefined => {
    const budget = useSelector(selectBudgetByTripId(tripId));
    if (!budget) {
        return undefined;
    }
    const categories = useSelector(selectBudgetCategoriesByBudgetId(budget.id))
    const [imageId, setImageId] = useState<string | undefined>()
    const [category, setCategory] = useState<BudgetCategory | undefined>()
    const [targetValue, setTargetValue] = useState<Money>({...budget.totalBudget, amount: 0})
    const [name, setName] = useState<string>("");
    const [comments, setComments] = useState<string>("");

    const dispatch = useDispatch()
    const create = () => {
        const newItem = {
            tripId,
            budgetCategoryId: category?.id,
            targetValue,
            name,
            comments,
            imageId,
        }
        dispatch(createShoppingListItemWithUniqueId(newItem))
    }
    return {
        imageId, setImageId,
        categories, category, setCategory,
        targetValue, setTargetValue,
        name, setName,
        comments, setComments,
        create,
    }
}
