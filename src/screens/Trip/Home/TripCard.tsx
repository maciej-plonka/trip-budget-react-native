import React, {useMemo} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {format} from "date-fns";
import {daysUntil, hasEnded, isActive, Trip} from "../../../store/models";

type Props = {
    trip: Trip
}

const formatDate = (trip: Trip): string => {
    if (isActive(trip)) {
        return "Active"
    }
    if (hasEnded(trip)) {
        return "Trip finished"
    }
    const daysLeft = daysUntil(trip);
    if (daysLeft > 30) {
        return format(trip.startDate, "MM.dd.yyyy")
    }
    return daysLeft == 1
        ? "Starts tomorrow"
        : `Starts in ${daysLeft} days`
}


export const TripCard = ({trip}: Props) => {
    const image = trip.image ?? "http://unsplash.it/365/176"
    const date = useMemo(() => formatDate(trip), [trip])
    return (
        <View style={styles.tripCard}>
            <Image source={{uri: image}} style={styles.image}/>
            <View style={styles.cardBody}>
                <Text style={styles.title}>{trip.name}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tripCard: {
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
    },

    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    cardBody: {
        width: "100%",
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: "column",
    },


    title: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold"
    },
    date: {
        fontSize: 12,
        color: "#B5B5B5"
    },
})
