import React, {useEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {
    Button,
    Card,
    Column,
    enhanceFormik,
    Expanded,
    FormCalendarInput,
    FormTextInput,
    Icon,
    ImagePicker,
    Row,
    Screen,
    Space
} from "../../../components";
import {confirmMessageBox, showToast} from "../../../models";
import {TripNavigationProps} from "../../../navigation";
import {TripEditValues, useTripEdit} from "./TripEditHook";
import {Formik, FormikHelpers} from "formik";
import {tripValidationSchema} from "../TripValidationSchema";

export function TripEditScreen({navigation, route}: TripNavigationProps<"TripEditScreen">) {
    const {initialValues, exists, remove, update} = useTripEdit(route.params.tripId);
    useEffect(() => {
        !exists && navigation.navigate("TripHomeScreen")
    }, [exists])
    if (!exists) return (<View/>)


    async function handleSubmit(values: TripEditValues, actions: FormikHelpers<TripEditValues>) {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        update(values)
        showToast("Trip updated")
        navigation.goBack();
    }

    async function handleDelete() {
        const shouldDelete = await confirmMessageBox({title: "Caution!", description: "Do you want to delete trip?"});
        if (!shouldDelete) {
            return;
        }
        showToast("Trip deleted")
        remove();
    }

    return (
        <Screen>
            <Screen.Header title={"Edit trip"}/>
            <Screen.Content>
                <ScrollView style={styles.root}>
                    <Formik<TripEditValues>
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={tripValidationSchema}>
                        {(props) => {
                            const {values} = props
                            const {hasErrors, setValueToValidate, error} = enhanceFormik(props)
                            return (
                                <Card>
                                    <ImagePicker value={values.image} onChanged={setValueToValidate("image")}/>
                                    <Column padding={16} alignItems={"stretch"}>
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
                                        <Row>
                                            <Button
                                                color={"primary"}
                                                disabled={hasErrors()}
                                                onClick={props.handleSubmit}
                                                style={styles.button}>
                                                <Icon iconType={"confirm"} size={22}/>
                                            </Button>
                                            <Expanded/>
                                            <Button
                                                color={"error"}
                                                onClick={handleDelete}
                                                style={styles.button}>
                                                <Icon iconType={"delete"} size={22}/>
                                            </Button>
                                            <Space size={8}/>
                                        </Row>
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

const styles = StyleSheet.create({
    root: {
        padding: 16,
    },
    button: {
        marginLeft: 4,

    }
});
