import React from "react";
import {FormButtonRow, FormBuyButton, FormConfigureButton} from "../../../../components";
import {useNavigation} from "@react-navigation/native";
import {WishNavigation} from "../../../../navigation";
import {Wish} from "../../../../store/states";
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
            <FormBuyButton onClick={onBuy}/>
            <FormConfigureButton onClick={onConfigure}/>
        </FormButtonRow>
    )
}
