import {useState} from "react";
import {Money} from "../../../models/Money";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectWishById} from "../../../store/selectors";
import {deleteWishById, updateWish} from "../../../store/actions/WishActions";
import {Id} from "../../../store";
import {BudgetCategory, Wish} from "../../../store/models";
import {findBy} from "../../../utils/Collections";

type WishEdit = {
    image: string | undefined,
    setImage(imageId: string | undefined): void
    categories: ReadonlyArray<BudgetCategory>
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


export const useWishEdit = (itemId: Id): WishEdit | undefined => {
    const wish = useSelector(selectWishById(itemId))
    const dispatch = useDispatch()
    const categories = useSelector(selectBudgetCategoriesByTripId(wish?.tripId ?? "-1"))
    if (!wish) {
        return undefined
    }
    const currentCategory = findBy(categories, "id", wish.budgetCategoryId ?? "-1");
    const [image, setImage] = useState<string | undefined>(wish.image);
    const [category, setCategory] = useState<BudgetCategory | undefined>(currentCategory);
    const [targetValue, setTargetValue] = useState<Money>(wish.targetValue)
    const [name, setName] = useState<string>(wish.name)
    const [comments, setComments] = useState<string>(wish.comments)

    const update = () => {
        const toUpdate: Wish = {...wish, image, targetValue, name,comments, budgetCategoryId: category?.id}
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
