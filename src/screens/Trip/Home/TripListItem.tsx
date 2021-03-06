import {StyleSheet, View} from "react-native";
import React from "react";
import {Space} from "../../../components";
import {Trip} from "../../../store/models";
import {TripCard} from "./TripCard";

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
