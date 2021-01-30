import {Trip} from "../../../store/states";
import {Image, StyleSheet, Text, View} from "react-native";
import {format} from "date-fns";
import {Card, FormButtonRow, FormConfigureButton} from "../../../components";
import React from "react";

type Props = {
    trip: Trip,
    onConfigure:() => void
}
export const TripDetailsCard = ({trip, onConfigure}: Props) => {
    return (
        <Card style={styles.detailsCard}>
            <Image source={{uri: "http://unsplash.it/365/176"}} style={styles.image}/>
            <View style={styles.cardDescription}>
                <Text style={styles.title}>{trip.name}</Text>
                <View style={styles.dates}>
                    <Text style={styles.date}>{format(trip.startDate, "dd.MM.yyyy")}</Text>
                    <Text style={styles.date}>{format(trip.endDate, "dd.MM.yyyy")}</Text>
                </View>
                <FormButtonRow right>
                    <FormConfigureButton onClick={onConfigure}/>
                </FormButtonRow>
            </View>

        </Card>
    )
}

const styles = StyleSheet.create({
    detailsCard: {
        flexDirection: "column"
    },

    image: {
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
    }
})
