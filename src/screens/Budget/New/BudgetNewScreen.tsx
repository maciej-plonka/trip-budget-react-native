import React, {useEffect} from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {
    Button,
    Center,
    FormButtonRow,
    FormCard,
    FormMoneyInput,
    Icon,
    Screen,
    Space,
    TextWhite
} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId} from "../../../store/selectors";
import {Id} from "../../../store";
import * as yup from "yup"
import {moneySchema} from "../../../validation";
import {defaultMoney, Money} from "../../../models";
import {Formik, FormikHelpers} from "formik";
import {enhanceFormik} from "../../../components/Form/FormikEnhanced";
import {NewBudget} from "../../../store/models";
import {createBudget} from "../../../store/actions/BudgetActions";

type BudgetNewValues = {
    totalBudget: Money
}

const budgetNewValidationSchema = yup.object().shape({
    totalBudget: moneySchema
})

const initialValues: BudgetNewValues = {
    totalBudget: defaultMoney()
}


const useBudgetNew = (tripId: Id) => {
    const budget = useSelector(selectBudgetByTripId(tripId));
    const dispatch = useDispatch()
    const create = (values: BudgetNewValues) => {
        const newBudget: NewBudget = {
            tripId,
            totalBudget: values.totalBudget
        }
        dispatch(createBudget(newBudget))

    }
    return {
        create,
        initialValues,
        budget
    }
}

export const BudgetNewScreen = ({route, navigation}: BudgetNavigationProps<"BudgetNewScreen">) => {
    const tripId = route.params.tripId;
    const budgetNew = useBudgetNew(tripId);

    useEffect(() => {
        const {budget} = budgetNew
        budget && navigation.replace("BudgetHomeScreen", {tripId})
    }, [budgetNew.budget])
    const handleSubmit = async (values: BudgetNewValues, actions: FormikHelpers<BudgetNewValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        budgetNew.create(values);
    }
    return (
        <Screen>
            <Screen.Header title={"New Budget"} color={"budget"}/>
            <Screen.Content>
                <Center padding={16}>
                    <Formik<BudgetNewValues>
                        initialValues={budgetNew.initialValues}
                        validationSchema={budgetNewValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {props => {
                            const {values} = props
                            const {setValueToValidate, hasErrors, error} = enhanceFormik(props);
                            return (
                                <FormCard>
                                    <FormMoneyInput
                                        label={"Budget"}
                                        value={values.totalBudget}
                                        error={error("totalBudget")}
                                        onChanged={setValueToValidate("totalBudget")}/>
                                    <FormButtonRow center>
                                        <Button onClick={props.handleSubmit} color={"primary"} disabled={hasErrors()}>
                                            <Icon iconType={"confirm"} size={18}/>
                                            <Space size={8} direction={"vertical"}/>
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
