import {NewBudgetCategory} from "../../../store/models";
import React from "react";
import {
    Button,
    Card,
    FormButtonRow,
    FormCard,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Space,
    TextWhite
} from "../../../components";
import {Modal} from "react-native";
import {Money} from "../../../models";
import {enhanceFormik} from "../../../components/Form/FormikEnhanced";
import * as yup from "yup";
import {moneySchema} from "../../../validation";
import {Formik, FormikHelpers} from "formik";

type Props = {
    category: NewBudgetCategory,
    onEdited: (category: NewBudgetCategory) => void,
    onClosed: () => void,
}

type CategoryModalValues = {
    name: string,
    budget: Money,
}

const categoryModalValidationSchema = yup.object().shape({
    budget: moneySchema,
    name: yup.string().required("Name is required")
})


export function CategoryModal({category, onEdited, onClosed}: Props) {
    const initialValues: CategoryModalValues = {
        name: category.name,
        budget: category.categoryBudget
    }
    const handleSubmit = async (values: CategoryModalValues, actions: FormikHelpers<CategoryModalValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        const category: NewBudgetCategory = {
            name: values.name,
            categoryBudget: values.budget
        }
        onEdited(category);
    }
    return (
        <Modal
            onRequestClose={onClosed}
            visible
            animationType={"slide"}>
            <Card>
                <Formik<CategoryModalValues>
                    initialValues={initialValues}
                    validationSchema={categoryModalValidationSchema}
                    onSubmit={handleSubmit}>
                    {props => {
                        const {values} = props
                        const {setValueToValidate, hasErrors, error} = enhanceFormik(props);
                        return (
                            <FormCard>
                                <FormTextInput
                                    label={"Name"}
                                    value={values.name}
                                    error={error("name")}
                                    onChanged={setValueToValidate("name")}/>
                                <FormMoneyInput
                                    label={"Budget"}
                                    value={values.budget}
                                    error={error("budget")}
                                    onChanged={setValueToValidate("budget")}/>
                                <FormButtonRow center>
                                    <Button onClick={props.handleSubmit} color={"primary"} disabled={hasErrors()}>
                                        <Icon iconType={"confirm"} size={18}/>
                                        <Space size={8} direction={"vertical"}/>
                                        <TextWhite>Confirm</TextWhite>
                                    </Button>
                                </FormButtonRow>
                            </FormCard>
                        )
                    }}
                </Formik>
            </Card>
        </Modal>
    )
}

