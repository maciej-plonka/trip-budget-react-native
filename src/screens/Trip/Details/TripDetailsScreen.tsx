import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native"
import {useSelector} from "react-redux";
import {TripDetailsCard} from "./TripDetailsCard";
import {TripNavigationProps} from "../../../navigation";
import {Screen} from "../../../components";
import {TripDetailsBudgetProgress} from "./TripDetailsBudgetProgress";
import {selectTripById} from "../../../store/selectors";

export const TripDetailsScreen = ({navigation, route}: TripNavigationProps<"TripDetailsScreen">) => {
    const tripId = route.params.tripId;
    const trip = useSelector(selectTripById(tripId))
    useEffect(() => {
        !trip && navigation.navigate("TripHomeScreen")
    }, [trip])
    const handleConfigureTrip = () => navigation.push("TripEditScreen", {tripId})
    const handleConfigureBudget = () => navigation.push("TripBudgetEditScreen", {tripId});
    if(!trip) return (<View/>)
    return (
        <Screen>
            <Screen.Header title={"Trip details"}/>
            <Screen.Content>
                <View style={styles.root}>
                    <TripDetailsCard trip={trip} onConfigure={handleConfigureTrip}/>
                    <TripDetailsBudgetProgress trip={trip} onPress={handleConfigureBudget}/>
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
