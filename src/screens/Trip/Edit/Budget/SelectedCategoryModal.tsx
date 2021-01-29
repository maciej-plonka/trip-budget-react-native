import {BudgetCategory} from "../../../../store/states";
import {Modal, StyleSheet} from "react-native";
import {
    Center,
    FormButtonRow,
    FormCard,
    FormDeleteButton,
    FormMoneyInput,
    FormTextInput,
    FormUpdateButton
} from "../../../../components";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteBudgetCategoryById, updateBudgetCategory} from "../../../../store/actions";
import {Money} from "../../../../models/Money";

type Props = {
    category: BudgetCategory,
    onChanged: () => void
}
export const SelectedCategoryModal = ({category, onChanged}: Props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState(category.name)
    const [categoryBudget, setCategoryBudget] = useState<Money>(category.categoryBudget);

    const handleDeleteCategory = () => {
        dispatch(deleteBudgetCategoryById(category.id))
        onChanged()
    }

    const handleUpdateCategory = () => {
        const toUpdate: BudgetCategory = {
            ...category,
            name,
            categoryBudget
        }
        dispatch(updateBudgetCategory(toUpdate))
        onChanged();
    }
    return (
        <Modal
            style={StyleSheet.absoluteFill}
            animationType="slide"
            visible>
            <Center styles={StyleSheet.absoluteFill}>
                <FormCard>
                    <FormTextInput label={"Name"} value={name} onChanged={setName}/>
                    <FormMoneyInput label={"Budget"} value={categoryBudget} onChanged={setCategoryBudget}/>
                    <FormButtonRow>
                        <FormDeleteButton onClick={handleDeleteCategory}/>
                        <FormUpdateButton onClick={handleUpdateCategory}/>
                    </FormButtonRow>
                </FormCard>
            </Center>
        </Modal>
    )
}
