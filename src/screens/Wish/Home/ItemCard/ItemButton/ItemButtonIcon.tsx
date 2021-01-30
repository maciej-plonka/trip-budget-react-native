import React from "react";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

type Icon = "bought" | "configure"

type Props = {
    icon: Icon
}
export const ItemButtonIcon = ({icon}:Props) => {
    switch(icon){
        case "bought":
            return <MaterialCommunityIcons name={"check"} size={24} color={"white"}/>
        case "configure":
            return <MaterialIcons name={"settings"} size={24} color={"white"}/>
    }
}
