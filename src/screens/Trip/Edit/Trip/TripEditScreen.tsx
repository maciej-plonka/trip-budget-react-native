import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {Center} from "../../../../components/Center";
import {
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormDeleteButton,
    FormTextInput,
    FormUpdateButton
} from "../../../../components/Form";
import {confirmMessageBox} from "../../../../models/MessageBox";
import {showToast} from "../../../../models/Toast";
import {TripNavigationProps} from "../../../../navigation";
import {Screen} from "../../../../components/Screen";
import {useTripEdit} from "./TripEditHook";

export const TripEditScreen = ({navigation, route}: TripNavigationProps<"TripEditScreen">) => {
    const tripEdit = useTripEdit(route.params.tripId);
    useEffect(() => {
        !tripEdit && navigation.navigate("TripHomeScreen")
    },[tripEdit])
    if(!tripEdit) return (<View/>)


    const handleUpdate = async () => {
        tripEdit.update();
        showToast("Trip updated")
        navigation.goBack();
    }

    const handleDelete = async () => {
        const shouldDelete = await confirmMessageBox({title: "Caution!", description: "Do you want to delete trip?"});
        if (!shouldDelete) {
            return;
        }
        showToast("Trip deleted")
        tripEdit.remove();
    }

    return (
        <Screen>
            <Screen.Header title={"Edit trip"}/>
            <Screen.Content>
                <Center styles={styles.root}>
                    <FormCard>
                        <FormTextInput icon={"name"} label={"Name"} value={tripEdit.name} onChanged={tripEdit.setName}/>
                        <FormCalendarInput label={"Start date"} value={tripEdit.startDate} onChanged={tripEdit.setStartDate}/>
                        <FormCalendarInput label={"End date"} value={tripEdit.endDate} onChanged={tripEdit.setEndDate}/>
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
