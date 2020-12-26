import {Serializer} from "../../hooks";
import {Budget, BudgetCategory} from "./Types";

type SerializedBudget = {
    id: number,
    tripId: number,
    value: Money,
    categories: Array<{
        id: number
        name: number,
        color?: Color,
        value: Money
    }>

}
const BudgetSerializer: Serializer<Budget[]> = {
    fromJson(json: string): Budget[] {
       const budgets =  JSON.parse(json) as SerializedBudget[]
        return budgets.map(budget => ({
            ...budget,
            categories: budget.categories.map(category => category as BudgetCategory)
        }));
    },
    toJson(value: Budget[]): string {
        return JSON.stringify(value);
    }

}

export default BudgetSerializer;
