import React from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';

type Icon = "bought" | "buy"

type Props = {
    icon: Icon
}
export const ItemButtonIcon = ({icon}:Props) => {
    switch(icon){
        case "bought":
            return <MaterialCommunityIcons name={"check"} size={24} color={"white"}/>
        case "buy":
            return <MaterialCommunityIcons name={"cart-outline"} size={24} color={"white"}/>
    }
}
