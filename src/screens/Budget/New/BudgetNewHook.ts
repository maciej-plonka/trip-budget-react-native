import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectTripById} from "../../../store/selectors";
import {useMemo} from "react";
import {BudgetCategory, NewBudgetExpense, Trip} from "../../../store/models";
import {copyCurrency, defaultMoney, Money} from "../../../models";
import {createBudgetExpense} from "../../../store/actions/BudgetActions";
import * as yup from "yup"
import {moneySchema} from "../../../validation";
export type BudgetNewValues = {
    name: string,
    value: Money,
    category: BudgetCategory | undefined
}

const createInitialValues = (trip?: Trip): BudgetNewValues => ({
    name: '',
    value: trip ? copyCurrency(trip.totalBudget, 0) : defaultMoney(),
    category: undefined
})

export const budgetNewValidationSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    value: moneySchema
})

export const useBudgetNew = (tripId: Id) => {
    const trip = useSelector(selectTripById(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const initialValues = useMemo(() => createInitialValues(trip), [])
    const dispatch = useDispatch()
    const create = (values: BudgetNewValues) => {
        const budgetExpense: NewBudgetExpense = {
            tripId,
            name: values.name,
            value: values.value,
            categoryId: values.category?.id
        }
        dispatch(createBudgetExpense(budgetExpense))
    }
    return {
        categories,
        initialValues,
        create
    }
}
