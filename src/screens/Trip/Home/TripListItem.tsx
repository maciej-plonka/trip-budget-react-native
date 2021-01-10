import {useNavigation} from "@react-navigation/native";
import {TripNavigation} from "../../../navigation/Trip";
import {TouchableOpacity} from "react-native";
import TripCard from "./TripCard";
import React from "react";
import {Trip} from "../../../store/states";

type ListItemProps = {
    item: Trip
}

export const TripListItem = ({item}: ListItemProps) => {
    const navigation = useNavigation<TripNavigation<"HomeScreen">>()
    const navigateToTripModules = () => navigation.navigate("Modules", {
        screen: "ShoppingList",
        params: {
            screen: "HomeScreen",
            params: {tripId: item.id}
        }
    });
    const navigateToTripDetailsScreen = () => navigation.push("TripDetailsScreen", {tripId: item.id});
    return (
        <TouchableOpacity
            onPress={navigateToTripModules}
            onLongPress={navigateToTripDetailsScreen}
            delayLongPress={200}>
            <TripCard trip={item}/>
        </TouchableOpacity>
    )
}
