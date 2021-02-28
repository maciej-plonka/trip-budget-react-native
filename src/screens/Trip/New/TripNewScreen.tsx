import React from "react";
import {
    Button,
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormImagePicker,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Screen,
    TextWhite
} from "../../../components";
import {TripNavigationProps} from "../../../navigation";
import {TripNewValues, useTripNew} from "./TripNewHook";
import {ScrollView} from "react-native";
import {Formik, FormikHelpers} from "formik";
import {showToast} from "../../../models";
import {enhanceFormik} from "../../../components/Form/FormikEnhanced";
import {tripValidationSchema} from "../TripValidationSchema";

export const TripNewScreen = ({navigation}: TripNavigationProps<"TripNewScreen">) => {
    const {initialValues, create} = useTripNew()
    const onSubmit = async (values: TripNewValues, actions: FormikHelpers<TripNewValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        create(values);
        showToast("Trip created")
        navigation.goBack();
    }

    return (
        <Screen>
            <Screen.Header title={"New trip"}/>
            <Screen.Content>
                <ScrollView style={{padding: 16}}>
                    <Formik<TripNewValues>
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={tripValidationSchema}>
                        {props => {
                            const {values} = props
                            const {hasErrors, setValueToValidate, error} = enhanceFormik(props)
                            const avatar = <FormImagePicker value={values.image} onChanged={setValueToValidate("image")}
                                                            imageRatio={[2, 1]}/>;
                            return (
                                <FormCard avatar={avatar}>
                                    <FormTextInput
                                        label={"Name"}
                                        value={values.name}
                                        error={error("name")}
                                        onChanged={setValueToValidate("name")}/>
                                    <FormCalendarInput
                                        label={"Start date"}
                                        value={values.startDate}
                                        error={error("startDate")}
                                        onChanged={setValueToValidate("startDate")}/>
                                    <FormCalendarInput
                                        label={"End date"}
                                        value={values.endDate}
                                        error={error("endDate")}
                                        onChanged={setValueToValidate("endDate")}/>
                                    <FormMoneyInput label={"Budget"}
                                                    value={values.totalBudget}
                                                    error={error("totalBudget")}
                                                    onChanged={setValueToValidate("totalBudget")}
                                                    currencyEditable/>
                                    <FormButtonRow right>
                                        <Button onClick={props.handleSubmit} color={"primary"} disabled={hasErrors()}>
                                            <Icon iconType={"confirm"} size={19}/>
                                            <TextWhite>Create</TextWhite>
                                        </Button>
                                    </FormButtonRow>
                                </FormCard>
                            )
                        }}

                    </Formik>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
