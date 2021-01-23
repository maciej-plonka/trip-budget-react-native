import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native"
import {useSelector} from "react-redux";
import {selectBudgetByTripId, selectTripById} from "../../../store/selectors";
import {TripDetailsCard} from "./TripDetailsCard";
import {TripNavigationProps} from "../../../navigation";
import {Screen} from "../../../components/Screen";
import {BudgetProgress} from "../../../components/BudgetProgress";

export const TripDetailsScreen = ({navigation, route}: TripNavigationProps<"TripDetailsScreen">) => {
    const tripId = route.params.tripId;
    const trip = useSelector(selectTripById(tripId))
    const budget = useSelector(selectBudgetByTripId(tripId))
    useEffect(() => {
        !trip && navigation.navigate("TripHomeScreen")
    }, [trip])
    const handleConfigureTrip = () => navigation.push("TripEditScreen", {tripId})
    const handleConfigureBudget = () => navigation.push("TripBudgetEditScreen", {tripId});
    return (
        <Screen>
            <Screen.Header title={"Trip details"} />
            <Screen.Content>
                <View style={styles.root}>
                    {!!trip && (<TripDetailsCard trip={trip} onConfigure={handleConfigureTrip}/>)}
                    {!!budget && (<BudgetProgress budget={budget} onPress={handleConfigureBudget}/>)}
                </View>
            </Screen.Content>
        </Screen>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 16,
        flexDirection: "column"
    },
});
