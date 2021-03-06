import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {
    Button,
    Center,
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormImagePicker,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Screen,
    Space
} from "../../../components";
import {confirmMessageBox, showToast} from "../../../models";
import {TripNavigationProps} from "../../../navigation";
import {TripEditValues, useTripEdit} from "./TripEditHook";
import {Formik, FormikHelpers} from "formik";
import {enhanceFormik} from "../../../components/Form/FormikEnhanced";
import {tripValidationSchema} from "../TripValidationSchema";

export const TripEditScreen = ({navigation, route}: TripNavigationProps<"TripEditScreen">) => {
    const {initialValues, exists, remove, update} = useTripEdit(route.params.tripId);
    useEffect(() => {
        !exists && navigation.navigate("TripHomeScreen")
    }, [exists])
    if (!exists) return (<View/>)


    const handleSubmit = async (values: TripEditValues, actions: FormikHelpers<TripEditValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        update(values)
        showToast("Trip updated")
        navigation.goBack();
    }

    const handleDelete = async () => {
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
                <Center style={styles.root}>
                    <Formik<TripEditValues>
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={tripValidationSchema}
                    >
                        {(props) => {
                            const {values} = props
                            const {hasErrors, setValueToValidate, error} = enhanceFormik(props)
                            const avatar = <FormImagePicker value={values.image}
                                                            onChanged={setValueToValidate("image")}
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
                                    <FormButtonRow right>
                                        <Button
                                            color={"error"}
                                            onClick={handleDelete}
                                            style={styles.button}>
                                            <Icon iconType={"delete"} size={22}/>
                                        </Button>
                                        <Space size={8}/>
                                        <Button
                                            color={"primary"}
                                            disabled={hasErrors()}
                                            onClick={props.handleSubmit}
                                            style={styles.button}>
                                            <Icon iconType={"confirm"} size={22}/>
                                            <Text style={{color: "white"}}>Edit</Text>
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

const styles = StyleSheet.create({
    root: {
        padding: 16,
    },
    button: {
        marginLeft: 4,

    }
});
