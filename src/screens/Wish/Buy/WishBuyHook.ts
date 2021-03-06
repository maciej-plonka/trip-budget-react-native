import {defaultMoney, Money} from "../../../models";
import {BudgetCategory, Wish} from "../../../store/models";
import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId, selectBudgetCategoriesByBudgetId, selectWishById} from "../../../store/selectors";
import {buyWish} from "../../../store/actions/WishActions";
import {useMemo} from "react";
import * as yup from "yup";
import {moneySchema} from "../../../validation";
import {createWishInitialValues, wishCommentsSchema, wishNameSchema, WishValues} from "../WishValues";

export type WishBuyValues = WishValues & {
    actualValue: Money,
}

export const wishBuyValidationSchema = yup.object().shape({
    name: wishNameSchema,
    actualValue: moneySchema,
    targetValue: moneySchema,
    comments: wishCommentsSchema
})

const createInitialValues = (categories: ReadonlyArray<BudgetCategory>, wish: Wish | undefined): WishBuyValues =>
    ({
        ...createWishInitialValues(categories, wish),
        actualValue: wish?.targetValue ?? defaultMoney()
    })

export const useWishBuy = (tripId: Id, wishId: Id) => {
    const wish = useSelector(selectWishById(wishId))
    const budget = useSelector(selectBudgetByTripId(tripId))
    const categories = useSelector(selectBudgetCategoriesByBudgetId(tripId))
    const initialValues = useMemo(() => createInitialValues(categories, wish), [])
    const dispatch = useDispatch()

    const buy = (values: WishBuyValues) => {
        if(!budget) return;
        const wish: Wish = {
            id: wishId,
            tripId,
            name: values.name,
            targetValue: values.targetValue,
            comments: values.comments,
            budgetCategoryId: values.category?.id,
        }
        dispatch(buyWish(wish, values.actualValue, budget.id));
    }
    return {
        exists: !!wish || !!budget,
        buy,
        categories,
        initialValues
    }
}
