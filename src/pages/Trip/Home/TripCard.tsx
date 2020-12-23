import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {Trip} from "../../../contexts/TripContext";

type Props = {
    trip: Trip
}

const formatDate = ({startDate, endDate}: Trip): string => {
    const now = new Date();
    console.dir(startDate);
    if (now.getTime() > endDate.getTime())
        return "Trip finished"
    if (now.getTime() > startDate.getTime()) {
        return "Already started"
    }
    return [startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear()]
        .map(it => it < 10 ? "0" + it : "" + it)
        .join(".")
}


const TripCard = ({trip}: Props) => {
    return (
        <View style={styles.card}>
            <Image source={{uri: "http://unsplash.it/365/176"}} style={styles.image}/>
            <View style={styles.description}>
                <Text style={styles.title}>{trip.name}</Text>
                <View style={{flex: 1}}/>
                <Text style={styles.date}>{formatDate(trip)}</Text>
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
        marginBottom: 24,
    },

    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    description: {
        width: "100%",
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: "column"
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold"
    },

    date: {
        alignSelf: "flex-end",
        fontSize: 12,
        color: "#B5B5B5"
    }
})

export default TripCard
