import {useState} from "react";
import {BudgetCategory, Wish} from "../../../store/states";
import {Money} from "../../../models/Money";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectWishById} from "../../../store/selectors";
import {deleteWishById, updateWish} from "../../../store/actions/WishActions";

type WishEdit = {
    image: string | undefined,
    setImage(imageId: string | undefined): void
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
    remove(): void,
}


export const useWishEdit = (itemId: number): WishEdit | undefined => {
    const item = useSelector(selectWishById(itemId))
    const dispatch = useDispatch()
    if (!item) {
        return undefined
    }
    const categories: Readonly<BudgetCategory[]> = useSelector(selectBudgetCategoriesByTripId(item.tripId))
    const currentCategory = categories.find(it => it.id === item.budgetCategoryId)
    const [image, setImage] = useState<string | undefined>(item.image);
    const [category, setCategory] = useState<BudgetCategory | undefined>(currentCategory);
    const [targetValue, setTargetValue] = useState<Money>(item.targetValue)
    const [name, setName] = useState<string>(item.name)
    const [comments, setComments] = useState<string>(item.comments)

    const update = () => {
        const toUpdate: Wish = {
            ...item,
            image,
            targetValue,
            name,
            comments,
            budgetCategoryId: category?.id
        }
        dispatch(updateWish(toUpdate))
    }

    const remove = () => setTimeout(() => dispatch(deleteWishById(itemId)), 1000);

    return {
        image, setImage,
        categories, category, setCategory,
        targetValue, setTargetValue,
        name, setName,
        comments, setComments,
        update,
        remove
    }
}
