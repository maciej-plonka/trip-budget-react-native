import React from "react";
import {Button, FormButtonRow, Icon, Space, TextWhite} from "../../../../components";
import {useNavigation} from "@react-navigation/native";
import {WishNavigation} from "../../../../navigation";
import {StyleSheet} from "react-native";
import {Wish} from "../../../../store/models";

type Props = {
    wish: Wish
}
export const WishDetailsCardNavigation = ({wish} :Props) => {
    const navigation = useNavigation<WishNavigation<"WishDetailsScreen">>()
    const navigationParams = {tripId: wish.tripId, itemId: wish.id};
    const onConfigure = () => navigation.navigate("WishEditScreen", navigationParams)
    const onBuy = () => navigation.navigate("WishBuyScreen", navigationParams)
    return (
        <FormButtonRow right>
            <Button style={styles.button} onClick={onBuy} color={"secondary"} >
                <Icon iconType={"cart"} size={16} />
                <TextWhite>Buy</TextWhite>
            </Button>
            <Space size={8} />
            <Button style={styles.button} onClick={onConfigure} color={"primary"} >
                <Icon iconType={"configure"} size={16} />
                <TextWhite>Edit</TextWhite>
            </Button>
        </FormButtonRow>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16
    }
});
