import {EditedBudgetCategory} from "./EditedBudgetCategory";
import {Money} from "../../../models";
import {useCallback, useMemo} from "react";
import * as yup from "yup";
import {moneySchema} from "../../../validation";


export type EditCategoryValues = {
    name: string,
    budget: Money,
}

export const editCategoryValidationSchema = yup.object().shape({
    budget: moneySchema,
    name: yup.string().required("Name is required")
})

export function useEditCategoryModal(editedCategory: EditedBudgetCategory, onEdit: (updateCategory: EditedBudgetCategory) => void) {
    const initialValues = useMemo(() => ({
        name: editedCategory.category.name,
        budget: editedCategory.category.categoryBudget
    }), [editedCategory])

    const submit = useCallback((values: EditCategoryValues) => {
        const {name, budget} = values
        if (editedCategory.type == "EDIT") {
            onEdit({
                type: "EDIT",
                category: {...editedCategory.category, name, categoryBudget: budget}
            })
        } else {
            onEdit({
                type: "NEW",
                category: {...editedCategory.category, name, categoryBudget: budget}
            })
        }
    }, [onEdit]);

    return {
        initialValues,
        submit
    }
}
