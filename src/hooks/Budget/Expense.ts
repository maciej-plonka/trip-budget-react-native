import {BudgetExpense, ShoppingListItem} from "../../store/states";
import {useSelector} from "react-redux";
import {selectExpenseById} from "../../store/selectors";

export const useExpenseForShoppingItem = (item: ShoppingListItem): BudgetExpense | undefined => {
    if (!item.budgetExpenseId)
        return undefined
    return useSelector(selectExpenseById(item.budgetExpenseId));
}
