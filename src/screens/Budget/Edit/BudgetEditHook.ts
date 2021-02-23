import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectBudgetExpenseById} from "../../../store/selectors";
import {findBy} from "../../../utils/Collections";
import {useState} from "react";
import {BudgetCategory} from "../../../store/models";
import {defaultMoney, Money} from "../../../models/Money";
import {deleteBudgetExpenseById, updateBudgetExpense} from "../../../store/actions/BudgetActions";

export const useBudgetEdit = (id: Id, tripId: Id) => {
    const expense = useSelector(selectBudgetExpenseById(id))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const initialCategory = findBy(categories, "id", expense?.categoryId ?? "")
    const [category, setCategory] = useState<BudgetCategory | undefined>(initialCategory)
    const [value, setValue] = useState<Money>(expense?.value ?? defaultMoney())
    const [name, setName] = useState<string>(expense?.name ?? "")
    const dispatch = useDispatch()
    const update = () => {
        if (!expense) return;
        const toUpdate = {...expense, name, value, categoryId: category?.id}
        dispatch(updateBudgetExpense(toUpdate))
    }
    const remove = () => dispatch(deleteBudgetExpenseById(id))
    return {
        exists: expense != null,
        categories, category, setCategory,
        value, setValue,
        name, setName,
        update, remove
    }
}
