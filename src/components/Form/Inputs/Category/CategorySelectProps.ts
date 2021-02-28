import {BudgetCategory} from "../../../../store/models";
import {InputProps} from "../InputProps";

export type CategorySelectProps<T = BudgetCategory> = InputProps<T | undefined> & {
    values: ReadonlyArray<T>
    unselectedLabel?:string
}
