import React from "react";
import {
    Button,
    Center,
    FormButtonRow,
    FormCard,
    FormCategorySelect,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Screen,
    Space,
    TextWhite
} from "../../../../components";
import {BudgetNavigationProps} from "../../../../navigation";
import {budgetNewValidationSchema, BudgetNewValues, useBudgetExpenseNew} from "./BudgetExpenseNewHook";
import {showToast} from "../../../../models";
import {Formik, FormikHelpers} from "formik";
import {enhanceFormik} from "../../../../components/Form/FormikEnhanced";

export const BudgetExpenseNewScreen = ({route, navigation}: BudgetNavigationProps<"BudgetExpenseNewScreen">) => {
    const {initialValues, categories, create} = useBudgetExpenseNew(route.params.tripId)
    const handleSubmit = async (values: BudgetNewValues, actions: FormikHelpers<BudgetNewValues>) => {
        try {
            const valid = await actions.validateForm(values)
            if (!valid) return;
            create(values)
            showToast("Budget expense created")
            navigation.goBack()
        } catch (error) {
            showToast(error.message)
        }
    }
    return (
        <Screen>
            <Screen.Header title={"New Expense"} color={"budget"}/>
            <Screen.Content>
                <Center padding={16}>
                    <Formik<BudgetNewValues>
                        initialValues={initialValues}
                        validationSchema={budgetNewValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => {
                            const {error, hasErrors, setValueToValidate} = enhanceFormik(props)
                            return (
                                <FormCard>
                                    <FormCategorySelect
                                        label={"Category"}
                                        value={props.values.category}
                                        onChanged={setValueToValidate("category")}
                                        error={error("category")}
                                        values={categories}/>
                                    <FormMoneyInput
                                        label={"Amount"}
                                        value={props.values.value}
                                        error={error("value")}
                                        onChanged={setValueToValidate("value")}/>
                                    <FormTextInput
                                        label={"Name"}
                                        value={props.values.name}
                                        error={error("name")}
                                        onChanged={setValueToValidate("name")}/>
                                    <FormButtonRow center>
                                        <Button style={{paddingHorizontal: 16}}
                                                color={"primary"}
                                                onClick={props.handleSubmit}
                                                disabled={hasErrors()}>
                                            <Icon iconType={"confirm"} size={16}/>
                                            <Space size={8}/>
                                            <TextWhite>Create</TextWhite>
                                        </Button>
                                    </FormButtonRow>
                                </FormCard>
                            )
                        }}
                    </Formik>
                </Center>
            </Screen.Content>
        </Screen>
    )
}
