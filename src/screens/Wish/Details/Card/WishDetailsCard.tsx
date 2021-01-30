import React from "react";
import {Card} from "../../../../components";
import {Image, StyleSheet, Text, View} from "react-native";
import {isBought, Wish} from "../../../../store/states";
import {WishDetailsCardNavigation} from "./WishDetailsCardNavigation";

type Props = {
    wish: Wish
}

export const WishDetailsCard = ({wish}: Props) => {
    return (
        <Card style={styles.detailsCard} rounded>
            <Image source={{uri: wish.image}} style={styles.image}/>
            <View style={styles.cardBody}>
                <Text style={styles.title}>{wish.name}</Text>
                <Text style={styles.cardDescription}>{wish.comments}</Text>
                {!isBought(wish) && (<WishDetailsCardNavigation wish={wish} />)}
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
    cardBody: {
        padding: 8,
    },
    cardDescription: {
        width: "100%",
        paddingVertical: 10,
        flexDirection: "column"
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold"
    },
})
