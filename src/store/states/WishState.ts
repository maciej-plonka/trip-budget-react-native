import {Money} from "../../models/Money";

export type Wish = HasId &{
    tripId: number,
    imageId?:string,
    budgetCategoryId?: number,
    budgetExpenseId?: number
    name: string,
    comments: string,
    targetValue: Money,
    actualValue?: Money,
}

export type NewWish = HasId & {
    tripId: number,
    budgetCategoryId?: number,
    imageId?:string,
    name: string,
    comments: string,
    targetValue: Money
}

export const isBought = (item: Wish) => item.budgetExpenseId ?? false

export type WishState = {
    wishes: Readonly<Wish[]>
}

export const initialWishState: WishState = {
    wishes: []
}
