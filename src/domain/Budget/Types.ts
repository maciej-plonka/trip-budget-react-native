export type Budget = {
    id: number,
    tripId: number,
    value: Money,
    categories: BudgetCategory[]
}

export type BudgetCategory = {
    id: number,
    name: number,
    color?: Color,
    value: Money
}
