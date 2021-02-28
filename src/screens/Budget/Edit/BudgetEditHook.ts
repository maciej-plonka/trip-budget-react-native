import {useDispatch, useSelector} from "react-redux";
import {BudgetCategory, BudgetExpense} from "../../../store/models";
import {deleteBudgetExpenseById, updateBudgetExpense} from "../../../store/actions/BudgetActions";
import {Id} from "../../../store";
import {selectBudgetCategoriesByTripId, selectBudgetExpenseById} from "../../../store/selectors";
import {defaultMoney, Money} from "../../../models";
import {findBy} from "../../../utils/Collections";
import * as yup from "yup";
import {useMemo} from "react";
import {moneySchema} from "../../../validation";

export const budgetEditValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    value: moneySchema
})

export type BudgetEditValues = {
    name: string,
    value: Money,
    category: BudgetCategory | undefined
}

const createInitialValues = (expense: BudgetExpense | undefined, categories: ReadonlyArray<BudgetCategory>): BudgetEditValues => ({
    name: expense?.name ?? "",
    value: expense?.value ?? defaultMoney(),
    category: expense?.categoryId ? findBy(categories, "id", expense.categoryId) : undefined
})


export const useBudgetEdit = (id: Id, tripId: Id) => {
    const expense = useSelector(selectBudgetExpenseById(id))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const initialValues = useMemo(() => createInitialValues(expense, categories), [expense, categories])
    const dispatch = useDispatch()
    const onSubmit = (values: BudgetEditValues) => {
        if (!expense) return;
        const toUpdate: BudgetExpense = {
            ...expense,
            categoryId: values.category?.id,
            value: values.value,
            name: values.name
        }
        dispatch(updateBudgetExpense(toUpdate))
    }
    const remove = () => dispatch(deleteBudgetExpenseById(id))
    return {onSubmit, remove, categories, initialValues, exists: !!expense}
}
