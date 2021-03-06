import {HasId, Id} from "../BaseTypes";
import {Money} from "../../models";

export type Wish = HasId & {
    tripId: Id,
    budgetCategoryId?: Id,
    budgetExpenseId?: Id
    image?: string,
    name: string,
    comments: string,
    targetValue: Money,
}

export type NewWish = {
    tripId: Id,
    budgetCategoryId?: Id,
    image?: string,
    name: string,
    comments: string,
    targetValue: Money
}

export const isBought = (item: Wish) => item.budgetExpenseId ?? false
