import {Budget, BudgetCategory, SerializedBudgetExpense, SerializedTrip, Wish} from "./models";

export type State = {
    trips: ReadonlyArray<SerializedTrip>,
    budgets: ReadonlyArray<Budget>,
    budgetCategories: ReadonlyArray<BudgetCategory>,
    budgetExpenses: ReadonlyArray<SerializedBudgetExpense>,
    wishes: ReadonlyArray<Wish>
}

export const initialState: State = {
    trips: [],
    budgets: [],
    budgetCategories: [],
    budgetExpenses: [],
    wishes: []
}

