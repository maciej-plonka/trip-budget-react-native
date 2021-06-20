import React from "react";
import {
    Button,
    Card,
    enhanceFormik,
    FormButtonRow,
    FormCard,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Space,
    TextWhite
} from "../../../components";
import {Modal} from "react-native";
import {Formik, FormikHelpers} from "formik";
import {editCategoryValidationSchema, EditCategoryValues, useEditCategoryModal} from "./EditCategoryModalHook";
import {EditedBudgetCategory} from "./EditedBudgetCategory";

type Props = {
    editedCategory: EditedBudgetCategory,
    onEdited: (category: EditedBudgetCategory) => void,
    onClosed: () => void,
}

export function EditCategoryModal({editedCategory, onEdited, onClosed}: Props) {
    const editCategory = useEditCategoryModal(editedCategory, onEdited)

    const handleSubmit = async (values: EditCategoryValues, actions: FormikHelpers<EditCategoryValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        editCategory.submit(values)
    }
    return (
        <Modal
            onRequestClose={onClosed}
            visible
            animationType={"slide"}>
            <Card>
                <Formik<EditCategoryValues>
                    initialValues={editCategory.initialValues}
                    validationSchema={editCategoryValidationSchema}
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

