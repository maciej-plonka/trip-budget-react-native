import {Money} from "../../models/Money";

export type ShoppingListItem = HasId &{
    tripId: number,
    imageId?:string,
    budgetCategoryId?: number,
    budgetExpenseId?: number
    name: string,
    comments?: string,
    targetValue: Money,
    actualValue?: Money,
}

export type NewShoppingListItem = HasId & {
    tripId: number,
    budgetCategoryId?: number,
    imageId?:string,
    name: string,
    targetValue: Money
}

export const isBought = (item: ShoppingListItem) => item.budgetExpenseId ?? false

export type ShoppingListState = {
    items: Readonly<ShoppingListItem[]>
}

export const initialShoppingListState: ShoppingListState = {
    items: []
}
