import {Image, StyleSheet, Text, View} from "react-native";
import {format} from "date-fns";
import {Button, Card, Icon} from "../../../components";
import React from "react";
import {hasStarted, Trip} from "../../../store/models";

type Props = {
    trip: Trip,
}
export const TripDetailsCard = ({trip}: Props) => {
    const image = trip.image ?? "http://unsplash.it/365/176"
    return (
        <Card  rounded>
            <Image source={{uri: image}} style={styles.image}/>
            <View style={styles.cardDescription}>
                <Text style={styles.title}>{trip.name}</Text>
                <View style={styles.dates}>
                    <Text style={styles.date}>{format(trip.startDate, "dd.MM.yyyy")}</Text>
                    <Text style={styles.date}>{format(trip.endDate, "dd.MM.yyyy")}</Text>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    detailsCard: {
        position: "relative",
        flexDirection: "column"
    },

    floatingButton: {
        position: "absolute",
        right: 8,
        top: 8,
    },

    image: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: "100%",
        height: 180,
        resizeMode: "cover",
    },

    cardDescription: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: "column"
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold"
    },

    dates: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 8
    },
    date: {
        fontSize: 12,
        color: "#B5B5B5"
    },
})
