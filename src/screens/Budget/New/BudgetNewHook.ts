import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectTripById} from "../../../store/selectors";
import {useState} from "react";
import {BudgetCategory} from "../../../store/models";
import {copyCurrency, defaultMoney, Money} from "../../../models/Money";
import {createBudgetExpense} from "../../../store/actions/BudgetActions";

export const useBudgetNew = (tripId: Id) => {
    const trip = useSelector(selectTripById(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const [category, setCategory] = useState<BudgetCategory | undefined>()
    const [value, setValue] = useState<Money>(trip ? copyCurrency(trip.totalBudget, 0) : defaultMoney())
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const create = () => {
        const budgetExpense = {tripId, name, value, categoryId: category?.id}
        dispatch(createBudgetExpense(budgetExpense))
    }
    return {
        categories, category, setCategory,
        value, setValue,
        name, setName,
        create
    }
}
