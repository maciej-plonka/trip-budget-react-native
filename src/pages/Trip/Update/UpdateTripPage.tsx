import React, {useEffect, useState} from "react";
import {TripNavigationProps} from "../TripParamList";
import {Alert, StyleSheet, ToastAndroid} from "react-native";
import Page from "../../Page";
import Center from "../../../components/Center/Center";
import {
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormDeleteButton,
    FormTextInput,
    FormUpdateButton
} from "../../../components/Form";
import {useDispatch, useSelector} from "react-redux";
import {selectTripById} from "../../../store/selectors";
import {deleteFullTrip, updateTrip} from "../../../store/actions";
import {Trip} from "../../../store/states";
import {StackActions} from "@react-navigation/native";

const pageTitle = "Update trip"

const createDeleteAlert = (): Promise<boolean> => new Promise(resolve => {
    Alert.alert(
        "Caution!",
        `Do you really want to delete the trip?`,
        [
            {text: "Yes", onPress: () => resolve(true), style: "destructive"},
            {text: "No", onPress: () => resolve(false)}
        ]
    )
})

const showMessage = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        33
    );
}

const UpdateTripPage = ({navigation, route}: TripNavigationProps<"UpdateTripPage">) => {
    const {tripId} = route.params
    const trip = useSelector(selectTripById(tripId))


    const dispatch = useDispatch()
    const [name, setName] = useState(trip?.name ?? "")
    const [startDate, setStartDate] = useState<Date>(trip?.startDate ?? new Date())
    const [endDate, setEndDate] = useState<Date>(trip?.endDate ?? new Date())

    useEffect(() => {
        !trip && navigation.navigate("HomePage")
    },[trip])

    const handleUpdate = async () => {
        const tripToUpdate: Trip = {id: tripId, name, startDate, endDate}
        dispatch(updateTrip(tripToUpdate))
        showMessage("Trip updated")
        navigation.goBack();
    }

    const handleDelete = async () => {
        const shouldDelete = await createDeleteAlert();
        if (!shouldDelete) {
            return;
        }
        showMessage("Trip deleted")
        await dispatch(deleteFullTrip(tripId))
    }

    return (
        <Page title={pageTitle}>
            <Center styles={styles.root}>
                <FormCard>
                    <FormTextInput icon={"name"} label={"Name"} value={name} onChanged={setName}/>
                    <FormCalendarInput label={"Start date"} value={startDate} onChanged={setStartDate}/>
                    <FormCalendarInput label={"End date"} value={endDate} onChanged={setEndDate}/>
                    <FormButtonRow right>
                        <FormDeleteButton onClick={handleDelete}/>
                        <FormUpdateButton onClick={handleUpdate}/>
                    </FormButtonRow>
                </FormCard>
            </Center>
        </Page>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 16,
    }
});

export default UpdateTripPage;
