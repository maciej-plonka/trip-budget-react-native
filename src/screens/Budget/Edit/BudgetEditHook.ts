import {defaultMoney, Money} from "../../../models";
import * as yup from "yup";
import {moneySchema} from "../../../validation";
import {BudgetCategory} from "../../../store/models";
import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetById, selectBudgetCategoriesByBudgetId} from "../../../store/selectors";
import {useCallback, useMemo} from "react";
import {updateBudget} from "../../../store/actions/BudgetActions";


export type BudgetEditValues = {
    totalBudget: Money,
}

export const budgetEditValidationSchema = yup.object().shape({
    totalBudget: moneySchema
})

type BudgetEdit =
    { type: "NOT_FOUND" } |
    {
        type: "FOUND",
        initialValues: BudgetEditValues
        update(values: BudgetEditValues): void,
    }


export function useBudgetEdit(tripId: Id, budgetId: Id): BudgetEdit {
    const dispatch = useDispatch()
    const budget = useSelector(selectBudgetById(budgetId));
    const update = useCallback((values: BudgetEditValues) => {
        if (!budget) return;
        dispatch(updateBudget({...budget, totalBudget: values.totalBudget}))
    }, [budget]);
    const initialValues = useMemo(() => ({
        totalBudget: budget?.totalBudget ?? defaultMoney()
    }), [budget]);

    if (!budget)
        return {type: "NOT_FOUND"};

    return {
        type: "FOUND",
        initialValues,
        update,
    }
}

