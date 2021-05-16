import {confirmMessageBox, defaultMoney, Money} from "../../../models";
import {Id} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId} from "../../../store/selectors";
import {useCallback, useMemo, useState} from "react";
import {NewBudget, NewBudgetCategory} from "../../../store/models";
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
const deleteCategoryConfirmOptions = {
    title: "Are you sure?",
    description: "Do you really want to delete this category?"
}

export function useBudgetNew(tripId: Id) {
    const budget = useSelector(selectBudgetByTripId(tripId));
    const [categories, setCategories] = useState<NewBudgetCategory[]>([]);
    const [currentCategory, setCurrentCategory] = useState<number | undefined>();
    const dispatch = useDispatch()

    const create = useCallback((values: BudgetNewValues) => {
        const newBudget: NewBudget = {tripId, totalBudget: values.totalBudget}
        dispatch(createBudget(newBudget, categories))
    }, [categories, dispatch]);

    const stopEditingCategory = useCallback(() => setCurrentCategory(undefined), [])

    const editCategory = useCallback((index: number) => {
        setCurrentCategory(index)
    }, [])
    const updateEditedCategory = useCallback((newCategory: NewBudgetCategory) => {
        if (currentCategory == undefined) return;
        if (currentCategory < categories.length) {
            const newCategories = categories.map((previousCategory, index) => {
                return index == currentCategory ? newCategory : previousCategory;
            })
            setCategories(newCategories);
        } else {
            setCategories(prev => [...prev, newCategory]);
        }
        setCurrentCategory(undefined);
    }, [categories, currentCategory])
    const addCategory = useCallback(() => {
        setCurrentCategory(categories.length);
    }, [categories.length]);


    const removeCategory = useCallback(async (targetIndex: number) => {
        const proceed = await confirmMessageBox(deleteCategoryConfirmOptions);
        if (!proceed) return;
        setCategories(prev => prev.filter((v, index) => index !== targetIndex))
    }, []);
    const editedCategory = useMemo(() => {
        if (currentCategory == undefined)
            return;
        if (currentCategory < categories.length)
            return categories[currentCategory]
        const newCategory: NewBudgetCategory = {
            name: "",
            categoryBudget: defaultMoney()
        }
        return newCategory;
    }, [currentCategory, categories])

    return {
        create,
        initialValues,
        budget,
        categories,
        editCategory,
        updateEditedCategory,
        stopEditingCategory,
        addCategory,
        removeCategory,
        editedCategory,
    }
}
