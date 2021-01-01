import React, {useEffect} from "react";
import {TripNavigationProps} from "../TripParamList";
import {Image, StyleSheet, Text, View} from "react-native"
import Page from "../../Page";
import Card from "../../../components/Card";
import {useSelector} from "react-redux";
import {selectBudgetByTripId, selectBudgetCategoriesByBudgetId, selectTripById} from "../../../store/selectors";
import BudgetProgress from "../../../components/BudgetProgress";
import {Budget, BudgetCategory} from "../../../store/states";
import {format} from "date-fns";
import {FormButtonRow, FormConfigureButton} from "../../../components/Form";
import {Money} from "../../../models/Money";
import {TripDetailsCard} from "./TripDetailsCard";
import {createNativeStackNavigator} from "react-native-screens/native-stack";

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
