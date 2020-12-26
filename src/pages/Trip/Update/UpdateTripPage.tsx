import React, {useState} from "react";
import {TripNavigationProps} from "../TripParamList";
import { useTripContext, useTripDispatchContext} from "../../../contexts/TripContext";
import {StyleSheet, View} from "react-native";
import Page from "../../Page";
import Center from "../../../components/Center/Center";
import {FormButtonRow, FormCalendarInput, FormCard, FormTextInput, FormUpdateButton} from "../../../components/Form";
import BudgetProgress from "../../../components/BudgetProgress";
import {UpdateTrip} from "../../../domain/Trip";

const pageTitle = "Update trip"

const buildUpdateTrip = (id: number, name: string, startDate: Date, endDate: Date, totalBudget: number): UpdateTrip => ({
    id,
    name,
    startDate,
    endDate,
    totalBudget
})

const UpdateTripPage: React.FC<TripNavigationProps<"UpdateTripPage">> = ({navigation, route}) => {
    const {tripId} = route.params
    const trip = useTripContext().find(it => it.id === tripId)
    if (!trip) {
        navigation.goBack();
        return (<View/>);
    }
    const dispatch = useTripDispatchContext();
    const [name, setName] = useState(trip.name)
    const [startDate, setStartDate] = useState<Date>(trip.startDate)
    const [endDate, setEndDate] = useState<Date>(trip.endDate)

    const handleUpdate = async () => {
        const updateTrip = buildUpdateTrip(trip.id, name, startDate, endDate, trip.totalBudget);
        await dispatch({type: "update", updateTrip})
        navigation.goBack();
    }
    return (
        <Page title={pageTitle}>
            <Center styles={styles.root}>
                <FormCard>
                    <FormTextInput icon={"name"} label={"Name"} value={name} onChanged={setName}/>
                    <FormCalendarInput label={"Start date"} value={startDate} onChanged={setStartDate}/>
                    <FormCalendarInput label={"End date"} value={endDate} onChanged={setEndDate}/>

                    <BudgetProgress label={"Budget"} maxValue={trip.totalBudget} currentValue={0} spaceBelow/>
                    <FormButtonRow right>
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
