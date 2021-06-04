import {defaultMoney, Money} from "../../models";
import {BudgetCategory, Wish} from "../../store/models";
import {findBy} from "../../utils/Collections";
import * as yup from "yup";
import {moneySchema} from "../../validation";

export type WishValues = {
    name: string,
    targetValue: Money,
    comments: string,
    category: BudgetCategory | undefined
    image: string | undefined
}

export const createWishInitialValues = (categories: ReadonlyArray<BudgetCategory>, wish?: Wish): WishValues => ({
    name: wish?.name ?? "",
    comments: wish?.comments ?? "",
    targetValue: wish?.targetValue ?? defaultMoney(),
    category: wish?.budgetCategoryId ? findBy(categories, "id", wish.budgetCategoryId) : undefined,
    image: wish?.image
})

export const wishNameSchema = yup.string().required("Name is required")
export const wishCommentsSchema = yup.string().defined()

export const wishValidationSchema =  yup.object().shape({
    name: wishNameSchema,
    targetValue: moneySchema,
})
