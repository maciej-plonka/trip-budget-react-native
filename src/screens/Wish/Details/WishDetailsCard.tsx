import React from "react";
import {Card, FormButtonRow, FormBuyButton, FormConfigureButton} from "../../../components";
import {Image, StyleSheet, Text, View} from "react-native";
import {isBought, Wish} from "../../../store/states";
import {useNavigation} from "@react-navigation/native";
import {WishNavigation} from "../../../navigation";

type Props = {
    wish: Wish
}

export const WishDetailsCard = ({wish}: Props) => {
    const navigation = useNavigation<WishNavigation<"WishDetailsScreen">>()
    const navigationParams = {tripId: wish.tripId, itemId: wish.id};
    const onConfigure = () => navigation.navigate("WishEditScreen", navigationParams)
    const onBuy = () => navigation.navigate("WishBuyScreen", navigationParams)
    return (
        <Card style={styles.detailsCard} rounded>
            <Image source={{uri: "http://unsplash.it/365/176"}} style={styles.image}/>
            <View style={styles.cardBody}>
                <Text style={styles.title}>{wish.name}</Text>
                <Text style={styles.description}>{wish.comments}</Text>
                <FormButtonRow right>
                    {!isBought(wish) && (<FormBuyButton onClick={onBuy} />)}
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
    cardBody: {
        padding: 8,
    },
    description: {
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
