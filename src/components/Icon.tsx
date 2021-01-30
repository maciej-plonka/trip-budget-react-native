import React from "react";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {StyleProp, ViewStyle} from "react-native";

export type IconType = "confirm" | "delete" | "cart" | "add" | "configure" | "plus"
export type IconProps = {
    iconType: IconType,
    size: number,
    color?: string,
    style?: StyleProp<ViewStyle>
}

export const Icon = ({iconType, size, style, color = "white"}: IconProps) => {
    switch (iconType) {
        case "cart":
            return <MaterialCommunityIcons style={style} name="cart-outline" size={size} color={color}/>
        case "confirm":
            return <MaterialIcons style={style} name="check" size={size} color={color}/>
        case "delete":
            return <MaterialCommunityIcons style={style} name="delete-outline" size={size} color={color}/>
        case "add":
            return <MaterialCommunityIcons style={style} name={"plus"} size={size} color={color}/>
        case "configure":
            return <MaterialIcons style={style} name={"settings"} size={size} color={color}/>
        case "plus":
            return <MaterialCommunityIcons style={style} name={"plus"} size={size} color={color}/>
    }
}
