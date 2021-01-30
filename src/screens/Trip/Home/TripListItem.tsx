import {StyleSheet, View} from "react-native";
import TripCard from "./Card/TripCard";
import React from "react";
import {Trip} from "../../../store/states";
import {Space} from "../../../components";

type ListItemProps = {
    item: Trip | null
}

const EmptyListItem = () =>( <Space size={80} direction={"vertical"}/> )


export const TripListItem = ({item}: ListItemProps) => {
    return (
        <View style={styles.item}>
            {item ? (<TripCard trip={item}/>) : (<EmptyListItem/>)}
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        marginBottom: 16
    }
});
