import {Id} from "../../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetById, selectBudgetCategoriesByBudgetId, selectTripById} from "../../../../store/selectors";
import {useMemo} from "react";
import {Budget, BudgetCategory, NewBudgetExpense, Trip} from "../../../../store/models";
import {copyCurrency, defaultMoney, Money} from "../../../../models";
import {createBudgetExpense} from "../../../../store/actions/BudgetActions";
import * as yup from "yup"
import {moneySchema} from "../../../../validation";
export type BudgetNewValues = {
    name: string,
    value: Money,
    category: BudgetCategory | undefined
}

const createInitialValues = (budget?: Budget): BudgetNewValues => ({
    name: '',
    value: defaultMoney(),
    category: undefined
})

export const budgetNewValidationSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    value: moneySchema
})

export const useBudgetExpenseNew = (budgetId: Id) => {
    const trip = useSelector(selectBudgetById(budgetId))
    const categories = useSelector(selectBudgetCategoriesByBudgetId(budgetId))
    const initialValues = useMemo(() => createInitialValues(trip), [])
    const dispatch = useDispatch()
    const create = (values: BudgetNewValues) => {
        const budgetExpense: NewBudgetExpense = {
            budgetId,
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
