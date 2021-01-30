import {useNavigation} from "@react-navigation/native";
import {TripNavigation} from "../../../navigation/Trip";
import {TouchableOpacity, View} from "react-native";
import TripCard from "./Card/TripCard";
import React from "react";
import {Trip} from "../../../store/states";

type ListItemProps = {
    item: Trip | null
}

const EmptyListItem = () => {
    return (
        <View style={{height: 80}}/>
    )
}

export const TripListItem = ({item}: ListItemProps) => {
    return item ? (<TripCard trip={item}/>) : (<EmptyListItem/>)
}
