import React from "react";
import {Image, Text, StyleSheet, View} from "react-native";

interface TripCardProps {

}

const TripCard = ({}: TripCardProps) => {
    return (
        <View style={styles.card}>
            <Image source={{uri: "http://unsplash.it/365/176"}} style={styles.image}/>
            <View style={styles.description}>
                <Text style={styles.title}>Japanese Trip 2021</Text>
                <View style={{flex:1}}/>
                <Text style={styles.date}>Already started</Text>
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
