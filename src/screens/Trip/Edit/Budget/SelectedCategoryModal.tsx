import {Modal, StyleSheet} from "react-native";
import {
    Button,
    Center,
    FormButtonRow,
    FormCard,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Space,
    TextWhite
} from "../../../../components";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Money} from "../../../../models/Money";
import {BudgetCategory} from "../../../../store/models";
import {deleteBudgetCategoryById, updateBudgetCategory} from "../../../../store/actions/BudgetActions";

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
                    <FormButtonRow right>
                        <Button onClick={handleDeleteCategory} color={"error"}>
                            <Icon iconType={"delete"} size={19} />
                        </Button>
                        <Space size={8} />
                        <Button onClick={handleUpdateCategory} color={"primary"}>
                            <Icon iconType={"confirm"} size={19} />
                            <TextWhite>Edit</TextWhite>
                        </Button>
                    </FormButtonRow>
                </FormCard>
            </Center>
        </Modal>
    )
}
