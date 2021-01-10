import {useState} from "react";
import {BudgetCategory, ShoppingListItem} from "../../../../store/states";
import {Money} from "../../../../models/Money";
import {useDispatch, useSelector} from "react-redux";
import {selectShoppingItemById} from "../../../../store/selectors";
import {useBudgetCategoriesByTripId} from "../../../../hooks/Budget";
import {deleteShoppingListItemById, updateShoppingListItem} from "../../../../store/actions/ShoppingListActions";

type UpdateShoppingListItem = {
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
    update(): void,
    delete(): void,
}

export const useUpdateShoppingListItem = (itemId: number): UpdateShoppingListItem | undefined => {
    const item = useSelector(selectShoppingItemById(itemId))
    if (!item) {
        return undefined
    }
    const categories = useBudgetCategoriesByTripId(item.tripId)
    const currentCategory = categories.find(it => it.id === item.budgetCategoryId)
    const [imageId, setImageId] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<BudgetCategory | undefined>(currentCategory);
    const [targetValue, setTargetValue] = useState<Money>(item?.targetValue ?? {amount: 0, currency: "¥"})
    const [name, setName] = useState<string>(item?.name ?? "")
    const [comments, setComments] = useState<string>(item?.comments ?? "")
    const dispatch = useDispatch()
    return {
        imageId, setImageId,
        categories, category, setCategory,
        targetValue, setTargetValue,
        name, setName,
        comments, setComments,
        update() {
            const toUpdate: ShoppingListItem = {
                ...item,
                imageId,
                targetValue,
                name,
                comments,
                budgetCategoryId: category?.id
            }
            dispatch(updateShoppingListItem(toUpdate))
        },
        delete() {
            dispatch(deleteShoppingListItemById(itemId))
        }
    }
}
