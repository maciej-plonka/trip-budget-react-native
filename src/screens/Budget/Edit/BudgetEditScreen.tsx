import React, {useEffect} from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {
    Button,
    Center,
    FormButtonRow,
    FormCard,
    FormCategoryPicker,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Screen,
    TextWhite
} from "../../../components";
import {useBudgetEdit} from "./BudgetEditHook";

export const BudgetEditScreen = ({route, navigation}: BudgetNavigationProps<"BudgetEditScreen">) => {
    const {id, tripId} = route.params
    const {exists, ...budgetEdit} = useBudgetEdit(id, tripId)

    useEffect(() => {
        !exists && navigation.goBack()
    }, [exists])
    return (
        <Screen>
            <Screen.Header title={"Edit expense"} color={"budget"}/>
            <Screen.Content>
                <Center padding={16}>
                    <FormCard>
                        <FormCategoryPicker
                            label={"Category"}
                            value={budgetEdit.category}
                            values={budgetEdit.categories}
                            onChanged={budgetEdit.setCategory}/>
                        <FormMoneyInput
                            label={"Amount"}
                            value={budgetEdit.value}
                            onChanged={budgetEdit.setValue}/>
                        <FormTextInput
                            label={"Name"}
                            value={budgetEdit.name}
                            onChanged={budgetEdit.setName}/>
                        <FormButtonRow>
                            <Button color={"error"} onClick={budgetEdit.remove} disabled={!exists}>
                                <Icon iconType={"delete"} size={18}/>
                                <TextWhite>Delete</TextWhite>
                            </Button>
                            <Button color={"primary"} onClick={budgetEdit.update} disabled={!exists}>
                                <Icon iconType={"confirm"} size={18}/>
                                <TextWhite>Update</TextWhite>
                            </Button>
                        </FormButtonRow>
                    </FormCard>
                </Center>
            </Screen.Content>
        </Screen>
    )
}
