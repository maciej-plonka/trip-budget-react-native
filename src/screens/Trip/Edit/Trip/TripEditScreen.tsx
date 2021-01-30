import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {
    Button,
    Center,
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormTextInput,
    Icon,
    Screen
} from "../../../../components";
import {confirmMessageBox} from "../../../../models/MessageBox";
import {showToast} from "../../../../models/Toast";
import {TripNavigationProps} from "../../../../navigation";
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
                            <Button
                                color={"error"}
                                onClick={handleDelete}
                                style={styles.button}>
                                <Icon iconType={"delete"} size={22}/>
                            </Button>
                            <Button
                                color={"primary"}
                                onClick={handleUpdate}
                                style={styles.button}>
                                <Icon iconType={"confirm"} size={22}/>
                                <Text style={{color: "white"}}>Edit</Text>
                            </Button>
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
    },
    button: {
        marginLeft: 4,

    }
});
