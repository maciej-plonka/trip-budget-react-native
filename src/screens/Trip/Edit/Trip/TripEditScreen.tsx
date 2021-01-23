import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {Center} from "../../../../components/Center";
import {
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormDeleteButton,
    FormTextInput,
    FormUpdateButton
} from "../../../../components/Form";
import {useDispatch, useSelector} from "react-redux";
import {selectTripById} from "../../../../store/selectors";
import {deleteFullTrip, updateTrip} from "../../../../store/actions";
import {Trip} from "../../../../store/states";
import {confirmMessageBox} from "../../../../models/MessageBox";
import {showToast} from "../../../../models/Toast";
import {TripNavigationProps} from "../../../../navigation";
import {Screen} from "../../../../components/Screen";

export const TripEditScreen = ({navigation, route}: TripNavigationProps<"TripEditScreen">) => {
    const {tripId} = route.params
    const trip = useSelector(selectTripById(tripId))

    const dispatch = useDispatch()
    const [name, setName] = useState(trip?.name ?? "")
    const [startDate, setStartDate] = useState<Date>(trip?.startDate ?? new Date())
    const [endDate, setEndDate] = useState<Date>(trip?.endDate ?? new Date())

    useEffect(() => {
        !trip && navigation.navigate("TripHomeScreen")
    },[trip])

    const handleUpdate = async () => {
        const tripToUpdate: Trip = {id: tripId, name, startDate, endDate}
        dispatch(updateTrip(tripToUpdate))
        showToast("Trip updated")
        navigation.goBack();
    }

    const handleDelete = async () => {
        const shouldDelete = await confirmMessageBox({title: "Caution!", description: "Do you want to delete trip?"});
        if (!shouldDelete) {
            return;
        }
        showToast("Trip deleted")
        await dispatch(deleteFullTrip(tripId))
    }

    return (
        <Screen>
            <Screen.Header title={"Edit trip"}/>
            <Screen.Content>
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
            </Screen.Content>
        </Screen>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 16,
    }
});
