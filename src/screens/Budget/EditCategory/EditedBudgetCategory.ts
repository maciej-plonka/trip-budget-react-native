import {Budget, BudgetCategory} from "../../../store/models";
import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {copyCurrency} from "../../../models";
import {
    createBudgetCategory,
    deleteBudgetCategoryById,
    updateBudgetCategory
} from "../../../store/actions/BudgetActions";

export type EditedBudgetCategory =
    { type: "NEW", category: Omit<BudgetCategory, "id"> } |
    { type: "EDIT", category: BudgetCategory }


export function useEditedBudgetCategory(budget: Budget | undefined) {
    const dispatch = useDispatch()
    const [editedCategory, setEditedCategory] = useState<EditedBudgetCategory | undefined>()

    const addCategory = useCallback(() => {
        if (!budget) return;
        const newCategory = {
            name: "New category",
            budgetId: budget.id,
            categoryBudget: copyCurrency(budget.totalBudget, 0)
        };
        setEditedCategory({type: "NEW", category: newCategory})
    }, [budget]);

    const finishEditingCategory = useCallback((updatedCategory?: EditedBudgetCategory) => {
        setEditedCategory(undefined)
        if (!updatedCategory) return;
        if (updatedCategory.type == "EDIT") {
            dispatch(updateBudgetCategory(updatedCategory.category))
        } else {
            dispatch(createBudgetCategory(updatedCategory.category))
        }
    }, []);

    const editCategory = useCallback((category: BudgetCategory) => {
        setEditedCategory({type: "EDIT", category})
    }, [])

    const removeCategory = useCallback((category: BudgetCategory) => {
        dispatch(deleteBudgetCategoryById(category.id))
    }, [])


    return {
        editedCategory,
        addCategory,
        editCategory,
        removeCategory,
        finishEditingCategory
    }
}
