import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native"
import {Screen} from "../../Screen";
import {useSelector} from "react-redux";
import {selectBudgetByTripId, selectTripById} from "../../../store/selectors";
import BudgetProgress from "../../../components/BudgetProgress";
import {TripDetailsCard} from "./TripDetailsCard";
import {TripNavigationProps} from "../../../navigation";

export const TripDetailsScreen = ({navigation, route}: TripNavigationProps<"TripDetailsScreen">) => {
    const tripId = route.params.tripId;
    const trip = useSelector(selectTripById(tripId))
    const budget = useSelector(selectBudgetByTripId(tripId))
    useEffect(() => {
        !trip && navigation.navigate("HomeScreen")
    }, [trip])
    const handleConfigureTrip = () => navigation.push("UpdateTripScreen", {tripId})
    const handleConfigureBudget = () => navigation.push("UpdateTripBudgetScreen", {tripId});
    return (
        <Screen title={"Trip details"}>
            <View style={styles.root}>
                {trip
                    ? (<TripDetailsCard trip={trip} onConfigure={handleConfigureTrip}/>)
                    : (<Text>Trip not found</Text>)}
                {budget
                    ? (<BudgetProgress budget={budget} onPress={handleConfigureBudget}/>)
                    : (<Text>No budget for this trip</Text>)
                }
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 16,
        flexDirection: "column"
    },
});
