import {BudgetCategory, SerializedBudgetExpense, SerializedTrip, Wish} from "./models";

export type State = {
    trips: ReadonlyArray<SerializedTrip>,
    budgetCategories: ReadonlyArray<BudgetCategory>,
    budgetExpenses: ReadonlyArray<SerializedBudgetExpense>,
    wishes: ReadonlyArray<Wish>
}

export const initialState: State = {
    trips: [],
    budgetCategories: [],
    budgetExpenses: [],
    wishes: []
}

