import {BudgetCategory, BudgetExpense, SerializedTrip, Wish} from "./models";

export type State = {
    trips: Readonly<SerializedTrip[]>,
    budgetCategories: Readonly<BudgetCategory[]>,
    budgetExpenses: Readonly<BudgetExpense[]>,
    wishes: Readonly<Wish[]>
}

export const initialState: State = {
    trips: [],
    budgetCategories: [],
    budgetExpenses: [],
    wishes: []
}

