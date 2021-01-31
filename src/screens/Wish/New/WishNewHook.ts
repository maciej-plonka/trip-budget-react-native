import {buildMoney, defaultMoney, Money} from "../../../models/Money";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Id} from "../../../store";
import {selectBudgetCategoriesByTripId, selectTripById} from "../../../store/selectors";
import {BudgetCategory} from "../../../store/models";
import {createWish} from "../../../store/actions/WishActions";

type WishNew = {
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
    create(): void,
}

export const useWishNew = (tripId: Id): WishNew | undefined => {
    const trip = useSelector(selectTripById(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const [image, setImage] = useState<string | undefined>()
    const [category, setCategory] = useState<BudgetCategory | undefined>()
    const [targetValue, setTargetValue] = useState<Money>(trip ? buildMoney(0, trip.totalBudget.currency) : defaultMoney())
    const [name, setName] = useState<string>("");
    const [comments, setComments] = useState<string>("");

    const dispatch = useDispatch()
    const create = () => {
        const newItem = { tripId,budgetCategoryId: category?.id, targetValue, name,comments,image,}
        dispatch(createWish(newItem))
    }
    return {
        image, setImage,
        categories, category, setCategory,
        targetValue, setTargetValue,
        name, setName,
        comments, setComments,
        create,
    }
}
