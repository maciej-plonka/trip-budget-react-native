import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

type BottomTabIconName = "wish" | "budget"

type Props = {
    size: number,
    color: string,
    icon: BottomTabIconName
}

export const BottomTabIcon = ({icon, color,size}: Props) => {
    switch(icon) {
        case "budget":
            return <FontAwesome5 name="money-bill-alt" color={color} size={size} />
        case "wish":
            return <MaterialCommunityIcons name="cart-outline" color={color} size={size}  />
    }
}

