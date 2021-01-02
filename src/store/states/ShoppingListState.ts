import {Money} from "../../models/Money";

export type ShoppingListItem = HasId &{
    tripId: number,
    budgetCategoryId?: number,
    budgetExpenseId?: number
    name: string,
    description?: string,
    targetValue: Money,
    actualValue?: Money,
}

export type NewShoppingListItem = HasId & {
    tripId: number,
    budgetCategoryId?: number,
    name: string,
    description?: string,
    targetValue: Money
}

export const isBought = (item: ShoppingListItem) => item.budgetExpenseId ?? false

export type ShoppingListState = {
    items: Readonly<ShoppingListItem[]>
}

export const initialShoppingListState: ShoppingListState = {
    items: []
}
