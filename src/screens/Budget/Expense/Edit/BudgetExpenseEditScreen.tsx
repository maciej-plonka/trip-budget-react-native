import React, {useEffect} from "react";
import {BudgetNavigationProps} from "../../../../navigation";
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
import {Formik, FormikHelpers} from "formik";
import {budgetEditValidationSchema, BudgetEditValues, useBudgetExpenseEdit} from "./BudgetExpenseEditHook";
import {enhanceFormik} from "../../../../components/Form/FormikEnhanced";


export const BudgetExpenseEditScreen = ({route, navigation}: BudgetNavigationProps<"BudgetExpenseEditScreen">) => {
    const {expenseId, tripId} = route.params
    const {onSubmit, remove, exists, initialValues, categories} = useBudgetExpenseEdit(expenseId, tripId)

    useEffect(() => {
        !exists && navigation.goBack()
    }, [exists])

    const handleSubmit = async (values: BudgetEditValues, actions: FormikHelpers<BudgetEditValues>) => {
        const isValid = await actions.validateForm(values)
        if (!isValid) return;
        onSubmit(values)
        navigation.goBack()
    }

    return (
        <Screen>
            <Screen.Header title={"Edit expense"} color={"budget"}/>
            <Screen.Content>
                <Center padding={16}>
                    <Formik<BudgetEditValues>
                        initialValues={initialValues}
                        validationSchema={budgetEditValidationSchema}
                        onSubmit={handleSubmit}>
                        {(props) => {
                            const {setValueToValidate, error, hasErrors} = enhanceFormik(props)
                            return (
                                <FormCard>
                                    <FormCategorySelect
                                        label={"Category"}
                                        value={props.values.category}
                                        onChanged={setValueToValidate("category")}
                                        values={categories}
                                        error={error("category")}
                                    />
                                    <FormMoneyInput
                                        label={"Amount"}
                                        value={props.values.value}
                                        onChanged={setValueToValidate("value")}
                                        error={error("value")}
                                    />
                                    <FormTextInput
                                        label={"Name"}
                                        value={props.values.name}
                                        onChanged={setValueToValidate("name")}
                                        error={error("name")}
                                    />
                                    <FormButtonRow center>
                                        <Button color={"error"} onClick={remove}>
                                            <Icon iconType={"delete"} size={18}/>
                                            <TextWhite>Delete</TextWhite>
                                        </Button>
                                        <Space direction={"horizontal"} size={8}/>
                                        <Button color={"primary"} onClick={props.handleSubmit} disabled={hasErrors()}>
                                            <Icon iconType={"confirm"} size={18}/>
                                            <TextWhite>Update</TextWhite>
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
