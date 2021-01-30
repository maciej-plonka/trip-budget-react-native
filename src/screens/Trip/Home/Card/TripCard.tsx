import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {format} from "date-fns";
import {daysUntil, hasEnded, isActive, Trip} from "../../../../store/states";
import {TripCardActions} from "./TripCardActions";

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


const TripCard = ({trip}: Props) => {
    return (
        <View style={styles.card}>
            <Image source={{uri: "http://unsplash.it/365/176"}} style={styles.image}/>
            <View style={styles.cardBody}>
                <View style={styles.cardDescription}>
                    <Text style={styles.title}>{trip.name}</Text>
                    <Text style={styles.date}>{formatDate(trip)}</Text>
                </View>
                <View style={styles.cardNavigation}>
                    <TripCardActions trip={trip}/>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    card: {
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
        flexDirection: "row",
        alignItems: "stretch"
    },

    cardDescription: {
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
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
    cardNavigation: {},


})

export default TripCard
