import React from "react";
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
    Space,
    TextWhite
} from "../../../components";
import {BudgetNavigationProps} from "../../../navigation";
import {useBudgetNew} from "./BudgetNewHook";
import {showToast} from "../../../models/Toast";

export const BudgetNewScreen = ({route, navigation}: BudgetNavigationProps<"BudgetNewScreen">) => {
    const budgetNew = useBudgetNew(route.params.tripId)
    const handleNew = () => {
        try {
            budgetNew.create()
            showToast("Budget expense created")
            navigation.goBack()
        }catch(error){
            showToast(error.message)
        }
    }
    return (
        <Screen>
            <Screen.Header title={"New Expense"} color={"budget"}/>
            <Screen.Content>
                <Center padding={16}>
                    <FormCard>
                        <FormCategoryPicker
                            label={"Category"}
                            value={budgetNew.category}
                            onChanged={budgetNew.setCategory}
                            values={budgetNew.categories}/>
                        <FormMoneyInput
                            label={"Amount"}
                            value={budgetNew.value}
                            onChanged={budgetNew.setValue}/>
                        <FormTextInput
                            label={"Name"}
                            value={budgetNew.name}
                            onChanged={budgetNew.setName}
                            icon={"notes"}/>
                        <FormButtonRow center>
                            <Button style={{paddingHorizontal: 16}} color={"primary"} onClick={handleNew}>
                                <Icon iconType={"confirm"} size={16}/>
                                <Space size={8}/>
                                <TextWhite>Create</TextWhite>
                            </Button>
                        </FormButtonRow>
                    </FormCard>
                </Center>
            </Screen.Content>
        </Screen>
    )
}
