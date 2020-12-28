import React, {useState} from "react";
import {TripNavigationProps} from "../TripParamList";
import {Alert, StyleSheet, ToastAndroid, View} from "react-native";
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
import BudgetProgress from "../../../components/BudgetProgress";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId, selectTripById} from "../../../store/selectors";
import {deleteTrip, updateTrip} from "../../../store/actions";
import {Budget, Trip} from "../../../store/states";

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

const calculateCurrentBudget = (budget: Budget) :Money => ({
    currency: budget.value.currency,
    amount:  budget.categories.map(it => it.value.amount).reduce((a, b) => a + b, 0)
})

const UpdateTripPage: React.FC<TripNavigationProps<"UpdateTripPage">> = ({navigation, route}) => {
    const {tripId} = route.params
    const trip = useSelector(selectTripById(tripId))
    if (!trip) {
        navigation.goBack();
        return (<View/>);
    }
    const dispatch = useDispatch()
    const budget = useSelector(selectBudgetByTripId(tripId))
    const [name, setName] = useState(trip.name)
    const [startDate, setStartDate] = useState<Date>(trip.startDate)
    const [endDate, setEndDate] = useState<Date>(trip.endDate)

    const handleUpdate = async () => {
        const tripToUpdate:Trip = {id: tripId, name, startDate, endDate}
        dispatch(updateTrip(tripToUpdate))
        showMessage("Trip updated")
        navigation.goBack();
    }

    const handleDelete = async () => {
        const shouldDelete = await createDeleteAlert();
        if(!shouldDelete){
            return;
        }
        dispatch(deleteTrip(tripId))
        showMessage("Trip deleted")
    }
    const handleUpdateBudget =() => {
        navigation.push("UpdateTripBudgetPage", { tripId: trip.id})
    }
    return (
        <Page title={pageTitle}>
            <Center styles={styles.root}>
                <FormCard>
                    <FormTextInput icon={"name"} label={"Name"} value={name} onChanged={setName}/>
                    <FormCalendarInput label={"Start date"} value={startDate} onChanged={setStartDate}/>
                    <FormCalendarInput label={"End date"} value={endDate} onChanged={setEndDate}/>
                    {budget && (
                        <BudgetProgress label={"Budget"}
                                        spaceBelow
                                        onPress={handleUpdateBudget}
                                        currentValue={calculateCurrentBudget(budget)}
                                        maxValue={budget.value}/>
                    )}
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
