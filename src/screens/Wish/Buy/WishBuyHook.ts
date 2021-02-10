import {Money} from "../../../models/Money";
import {BudgetCategory} from "../../../store/models";
import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectWishById} from "../../../store/selectors";
import {useState} from "react";
import {buyWish} from "../../../store/actions/WishActions";

type WishBuy = {
    name: string,
    setName(name: string): void,
    targetValue: Money
    setTargetValue(targetValue: Money): void
    actualValue: Money,
    setActualValue(actualValue: Money): void,
    comments: string,
    setComments(comments: string): void,
    category: BudgetCategory | undefined
    setCategory(category: BudgetCategory | undefined): void
    categories: ReadonlyArray<BudgetCategory>
    buy(): void
}
export const useWishBuy = (itemId: Id): WishBuy | undefined => {
    const wish = useSelector(selectWishById(itemId))
    if (!wish) {
        return;
    }
    const dispatch = useDispatch()
    const categories = useSelector(selectBudgetCategoriesByTripId(wish.tripId))
    const [name, setName] = useState<string>(wish.name)
    const [actualValue, setActualValue] = useState<Money>(wish.targetValue)
    const [targetValue, setTargetValue] = useState<Money>(wish.targetValue)
    const [comments, setComments] = useState<string>(wish.comments)
    const [category, setCategory] = useState<BudgetCategory | undefined>(categories.find(it => it.id === wish.budgetCategoryId))

    const buy = () => {
        const wishToUpdate = {...wish, name, targetValue, comments, budgetCategoryId: category?.id}
        dispatch(buyWish(wishToUpdate, actualValue));
    }
    return {
        name, setName,
        targetValue, setTargetValue,
        actualValue, setActualValue,
        comments, setComments,
        category, setCategory, categories,
        buy

    }
}
