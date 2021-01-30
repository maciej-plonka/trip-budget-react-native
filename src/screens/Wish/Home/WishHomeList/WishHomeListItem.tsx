import {Wish} from "../../../../store/states";
import {useNavigation} from "@react-navigation/native";
import {WishNavigation} from "../../../../navigation";
import {ItemCard} from "../ItemCard";
import React from "react";

type Props = {
    wish: Wish
}

export const WishHomeListItem = ({wish}: Props) => {
    const navigation = useNavigation<WishNavigation<"WishHomeScreen">>()
    const navigateToEditScreen = () => navigation.push("WishDetailsScreen", {tripId: wish.tripId, itemId: wish.id})
    return ( <ItemCard item={wish} onClick={navigateToEditScreen} />)
}


