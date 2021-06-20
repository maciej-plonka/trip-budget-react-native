import {defaultMoney, Money} from "../../../models";
import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId} from "../../../store/selectors";
import {useCallback} from "react";
import {NewBudget} from "../../../store/models";
import {createBudget} from "../../../store/actions/BudgetActions";
import * as yup from "yup";
import {moneySchema} from "../../../validation";

export type BudgetNewValues = {
    totalBudget: Money,
}
export const budgetNewValidationSchema = yup.object().shape({
    totalBudget: moneySchema
})
const initialValues: BudgetNewValues = {
    totalBudget: defaultMoney()
}

export function useBudgetNew(tripId: Id) {
    const budget = useSelector(selectBudgetByTripId(tripId));
    const dispatch = useDispatch()

    const create = useCallback((values: BudgetNewValues) => {
        const newBudget: NewBudget = {tripId, totalBudget: values.totalBudget}
        dispatch(createBudget(newBudget))
    }, []);

    return {
        create,
        initialValues,
        budget,
    }
}
