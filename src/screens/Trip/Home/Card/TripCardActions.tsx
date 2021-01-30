import React from "react";
import {hasStarted, isActive, Trip} from "../../../../store/states";
import {Button, Icon} from "../../../../components";
import {useNavigation} from "@react-navigation/native";
import {TripNavigation} from "../../../../navigation/Trip";
import {View} from "react-native";

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
        <View style={{flexDirection: "row"}}>
            {isActive(trip) && (
                <Button onClick={navigateToTrip} color={"primary"}>
                    <Icon iconType={"confirm"} size={18} />
                </Button>
            )}
            {!hasStarted(trip) && (
                <Button onClick={navigateToDetails} color={"primary"}>
                    <Icon iconType={"configure"} size={18} />
                </Button>
            )}

        </View>
    )
}
