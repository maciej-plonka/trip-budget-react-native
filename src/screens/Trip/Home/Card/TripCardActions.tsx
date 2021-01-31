import React from "react";
import {Button, Icon, Space} from "../../../../components";
import {useNavigation} from "@react-navigation/native";
import {TripNavigation} from "../../../../navigation/Trip";
import {StyleSheet, View} from "react-native";
import {hasEnded, isActive, Trip} from "../../../../store/models";

type Props = {
    trip: Trip
}
export const TripCardActions = ({trip}:Props) => {
    const navigation = useNavigation<TripNavigation<"TripHomeScreen">>()
    const navigateToTrip = () => navigation.navigate("Modules", {
        screen: "Wish",
        params: {
            screen: "WishHomeScreen",
            params: {tripId: trip.id}
        }
    })
    const navigateToDetails = () => navigation.navigate("TripDetailsScreen", {tripId: trip.id})
    return (
        <View style={styles.container}>
            <Button onClick={navigateToTrip} color={"primary"} disabled={!isActive(trip)}>
                <Icon iconType={"confirm"} size={18} />
            </Button>
            <Button onClick={navigateToDetails} color={"primary"} disabled={hasEnded(trip)}>
                <Icon iconType={"configure"} size={18} />
            </Button>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    }
})
