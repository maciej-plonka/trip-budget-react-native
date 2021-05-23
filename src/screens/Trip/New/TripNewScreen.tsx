import React from "react";
import {
    Button,
    Card,
    Column,
    enhanceFormik,
    FormButtonRow,
    FormCalendarInput,
    FormTextInput,
    Icon,
    ImagePicker,
    Screen,
    TextWhite
} from "../../../components";
import {TripNavigationProps} from "../../../navigation";
import {TripNewValues, useTripNew} from "./TripNewHook";
import {ScrollView} from "react-native";
import {Formik, FormikHelpers} from "formik";
import {showToast} from "../../../models";
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
                            return (
                                <Card>
                                    <ImagePicker value={values.image} onChanged={setValueToValidate("image")}/>
                                    <Column padding={16}>
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
                                        <FormButtonRow right>
                                            <Button onClick={props.handleSubmit} color={"primary"}
                                                    disabled={hasErrors()}>
                                                <Icon iconType={"confirm"} size={19}/>
                                                <TextWhite>Create</TextWhite>
                                            </Button>
                                        </FormButtonRow>
                                    </Column>
                                </Card>
                            )
                        }}
                    </Formik>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
