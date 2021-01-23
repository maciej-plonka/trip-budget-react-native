import {useState} from "react";
import {BudgetCategory, Wish} from "../../../store/states";
import {Money} from "../../../models/Money";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectWishById} from "../../../store/selectors";
import {deleteWishById, updateWish} from "../../../store/actions/WishActions";

type WishEdit = {
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

export const useWishEdit = (itemId: number): WishEdit | undefined => {
    const item = useSelector(selectWishById(itemId))
    if (!item) {
        return undefined
    }
    const categories = useSelector(selectBudgetCategoriesByTripId(item.tripId))
    const currentCategory = categories.find(it => it.id === item.budgetCategoryId)
    const [imageId, setImageId] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<BudgetCategory | undefined>(currentCategory);
    const [targetValue, setTargetValue] = useState<Money>(item.targetValue)
    const [name, setName] = useState<string>(item.name )
    const [comments, setComments] = useState<string>(item.comments)
    const dispatch = useDispatch()
    return {
        imageId, setImageId,
        categories, category, setCategory,
        targetValue, setTargetValue,
        name, setName,
        comments, setComments,
        update() {
            const toUpdate: Wish = {
                ...item,
                imageId,
                targetValue,
                name,
                comments,
                budgetCategoryId: category?.id
            }
            dispatch(updateWish(toUpdate))
        },
        delete() {
            dispatch(deleteWishById(itemId))
        }
    }
}
