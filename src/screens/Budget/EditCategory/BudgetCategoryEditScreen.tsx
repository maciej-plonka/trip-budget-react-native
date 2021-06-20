import {BudgetNavigationProps} from "../../../navigation";
import {Button, Card, Column, Icon, Row, Screen, Space} from "../../../components";
import React, {useMemo} from "react";
import {EditCategoryModal} from "./EditCategoryModal";
import {Id} from "../../../store";
import {useSelector} from "react-redux";
import {StyleSheet, Text} from "react-native"
import {selectBudgetById, selectBudgetCategoriesByBudgetId} from "../../../store/selectors";
import {useEditedBudgetCategory} from "./EditedBudgetCategory";
import {copyCurrency, formatMoney, sumMoney} from "../../../models";
import {CategoryListItem} from "./CategoryListItem";

function useBudgetCategoryEditScreen(budgetId: Id) {
    const budget = useSelector(selectBudgetById(budgetId))
    const editBudgetCategory = useEditedBudgetCategory(budget);
    const categories = useSelector(selectBudgetCategoriesByBudgetId(budgetId))
    const editCategories = useMemo(() => {
        if (!budget) return [];
        const categoriesTotal = sumMoney(categories.map(it => it.categoryBudget))
        const editableCategories = categories.map(it => ({
            ...it,
            editable: true,
        }))
        const essentialsCategory = {
            id: "essentials",
            name: "Essentials",
            budgetId,
            categoryBudget: copyCurrency(budget.totalBudget, budget.totalBudget.amount - categoriesTotal.amount),
            editable: false,
        }
        return [essentialsCategory, ...editableCategories]
    }, [budget, categories]);
    return {
        ...editBudgetCategory,
        editCategories
    }
}

export function BudgetCategoryEditScreen({navigation, route}: BudgetNavigationProps<"BudgetCategoryEditScreen">) {
    const budgetCategoryEdit = useBudgetCategoryEditScreen(route.params.budgetId)
    return (
        <Screen>
            <Screen.Header title={"Edit category"} color={"budget"}/>
            <Screen.Content>
                {budgetCategoryEdit.editedCategory && (
                    <EditCategoryModal
                        editedCategory={budgetCategoryEdit.editedCategory}
                        onClosed={() => budgetCategoryEdit.finishEditingCategory()}
                        onEdited={budgetCategoryEdit.finishEditingCategory}/>
                )}
                <Column padding={16}>
                    {budgetCategoryEdit.editCategories.map(it => (
                        <CategoryListItem key={it.id}
                            category={it}
                            onEdit={() => budgetCategoryEdit.editCategory(it)}
                            onDelete={() => budgetCategoryEdit.removeCategory(it)}/>
                    ))}
                </Column>
            </Screen.Content>
            <Screen.Fab onClick={budgetCategoryEdit.addCategory}/>
        </Screen>
    )
}
