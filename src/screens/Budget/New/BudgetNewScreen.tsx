import React, {useCallback, useEffect} from "react";
import {BudgetNavigationProps} from "../../../navigation";
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
import {budgetNewValidationSchema, BudgetNewValues, useBudgetNew} from "./BudgetNewHook";

export function BudgetNewScreen({route, navigation}: BudgetNavigationProps<"BudgetNewScreen">) {
    const tripId = route.params.tripId;
    const budgetNew = useBudgetNew(tripId);

    useEffect(() => {
        const {budget} = budgetNew
        budget && navigation.replace("BudgetHomeScreen", {tripId})
    }, [budgetNew.budget])

    const handleSubmit = useCallback(async (values: BudgetNewValues, actions: FormikHelpers<BudgetNewValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        budgetNew.create(values);
    }, [])

    return (
        <Screen>
            <Screen.Header title={"New Budget"} color={"budget"}/>
            <Screen.Content>
                <Formik<BudgetNewValues>
                    initialValues={budgetNew.initialValues}
                    validationSchema={budgetNewValidationSchema}
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
                                            <TextWhite>Create Budget</TextWhite>
                                        </Button>
                                        <Space size={8}/>

                                    </Row>
                                </FormCard>

                            </Column>
                        )
                    }}
                </Formik>
            </Screen.Content>
        </Screen>
    )
}
