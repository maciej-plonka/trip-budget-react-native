import {BudgetNavigationProps} from "../../../navigation";
import {View} from "react-native";
import React, {useEffect} from "react";
import {
    Button,
    Column,
    enhanceFormik,
    FormCard,
    FormMoneyInput,
    Icon,
    Row,
    Screen,
    Space,
    TextWhite
} from "../../../components";
import {Formik, FormikHelpers} from "formik";
import {BudgetNewValues} from "../New/BudgetNewHook";
import {Budget} from "../../../store/models";
import {budgetEditValidationSchema, BudgetEditValues, useBudgetEdit} from "./BudgetEditHook";


export function BudgetEditScreen({route, navigation}: BudgetNavigationProps<"BudgetEditScreen">) {
    const {tripId, budgetId} = route.params
    const budgetEdit = useBudgetEdit(tripId, budgetId)

    useEffect(() => {
        budgetEdit.type == "NOT_FOUND" && navigation.pop();
    }, [budgetEdit.type])

    async function handleSubmit(values: BudgetNewValues, actions: FormikHelpers<BudgetNewValues>) {
        if (budgetEdit.type == "NOT_FOUND") return;
        const valid = await actions.validateForm(values)
        if (!valid) return;
        budgetEdit.update(values);
        navigation.pop();
    }

    if (budgetEdit.type == "NOT_FOUND") {
        return (<View/>)
    }

    return (
        <Screen>
            <Screen.Header title={"Edit trip budget"} color={"budget"}/>
            <Screen.Content>
                <Formik<BudgetEditValues>
                    initialValues={budgetEdit.initialValues}
                    validationSchema={budgetEditValidationSchema}
                    onSubmit={handleSubmit}>
                    {props => {
                        const {values} = props
                        const {setValueToValidate, hasErrors, error} = enhanceFormik(props);
                        return (
                            <Column padding={16}>
                                <FormCard>
                                    <FormMoneyInput
                                        label={"Budget"}
                                        value={values.totalBudget}
                                        error={error("totalBudget")}
                                        onChanged={setValueToValidate("totalBudget")}/>
                                    <Row>
                                        <Button onClick={props.handleSubmit} color={"primary"} disabled={hasErrors()}>
                                            <Icon iconType={"confirm"} size={18}/>
                                            <Space size={8} direction={"vertical"}/>
                                            <TextWhite>Update Budget</TextWhite>
                                        </Button>
                                        <Space size={8}/>

                                    </Row>
                                </FormCard>
                                <Space size={12} direction={"vertical"}/>
                            </Column>
                        )
                    }}
                </Formik>
            </Screen.Content>
        </Screen>
    )
}
