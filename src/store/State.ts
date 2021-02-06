import {BudgetCategory, BudgetExpense, SerializedTrip, Wish} from "./models";

export type State = {
    trips: ReadonlyArray<SerializedTrip>,
    budgetCategories: ReadonlyArray<BudgetCategory>,
    budgetExpenses: ReadonlyArray<BudgetExpense>,
    wishes: ReadonlyArray<Wish>
}

export const initialState: State = {
    trips: [],
    budgetCategories: [],
    budgetExpenses: [],
    wishes: []
}

