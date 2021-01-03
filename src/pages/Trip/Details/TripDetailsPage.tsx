import React, {useEffect} from "react";
import {TripNavigationProps} from "../TripParamList";
import {StyleSheet, Text, View} from "react-native"
import Page from "../../Page";
import {useSelector} from "react-redux";
import {selectBudgetByTripId, selectTripById} from "../../../store/selectors";
import BudgetProgress from "../../../components/BudgetProgress";
import {TripDetailsCard} from "./TripDetailsCard";

export const TripDetailsPage = ({navigation, route}: TripNavigationProps<"TripDetailsPage">) => {
    const tripId = route.params.tripId;
    const trip = useSelector(selectTripById(tripId))
    const budget = useSelector(selectBudgetByTripId(tripId))
    useEffect(() => {
        !trip && navigation.navigate("HomePage")
    }, [trip])
    const handleConfigureTrip = () => navigation.push("UpdateTripPage", {tripId})
    const handleConfigureBudget = () => navigation.push("UpdateTripBudgetPage", {tripId});
    return (
        <Page title={"Trip details"}>
            <View style={styles.root}>
                {trip
                    ? (<TripDetailsCard trip={trip} onConfigure={handleConfigureTrip}/>)
                    : (<Text>Trip not found</Text>)}
                {budget
                    ? (<BudgetProgress budget={budget} onPress={handleConfigureBudget}/>)
                    : (<Text>No budget for this trip</Text>)
                }
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 16,
        flexDirection: "column"
    },
});
