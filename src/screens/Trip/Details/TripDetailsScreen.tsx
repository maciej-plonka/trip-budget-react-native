import React, {useCallback, useEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native"
import {useSelector} from "react-redux";
import {TripNavigationProps} from "../../../navigation";
import {Column, Screen, Space} from "../../../components";
import {selectTripById} from "../../../store/selectors";
import {TripDetailsCard} from "./TripDetailsCard";
import {TripModule, TripModulesCard} from "./TripModulesCard";

export const TripDetailsScreen = ({navigation, route}: TripNavigationProps<"TripDetailsScreen">) => {
    const tripId = route.params.tripId;
    const trip = useSelector(selectTripById(tripId))
    useEffect(() => {
        !trip && navigation.navigate("TripHomeScreen")
    }, [trip])

    const handleConfigureTrip = useCallback(() => navigation.push("TripEditScreen", {tripId}), []);

    const handleModuleSelected = useCallback((tripModule: TripModule) => {
        if (tripModule === "wish") navigation.push("Wish", {tripId})
        else if (tripModule === "budget") navigation.push("Budget", {tripId})
    }, []);

    if (!trip) return (<View/>)
    return (
        <Screen>
            <Screen.Header title={"Trip details"} onConfiguration={handleConfigureTrip}/>
            <Screen.Content>
                <ScrollView>
                    <Column padding={16}>
                        <TripDetailsCard trip={trip}/>
                        <Space size={16} direction={"vertical"}/>
                        <TripModulesCard trip={trip} onModuleSelected={handleModuleSelected}/>
                    </Column>
                </ScrollView>
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
