import React from "react";
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Styled} from "./Blocks";

export type IconType = "confirm" | "delete" | "cart" | "add" | "configure" | "plus" | "money" | "notes" | "calendar" | "category"
export type IconProps = Styled & {
    iconType: IconType,
    size: number,
    color?: string,
}

export const Icon = ({iconType, ...props}: IconProps) => {
    const propsWithDefinedColor = {...props, color: props.color ?? "white"}
    switch (iconType) {
        case "cart":
            return <MaterialCommunityIcons name="cart-outline" {...propsWithDefinedColor}/>
        case "confirm":
            return <MaterialIcons name="check" {...propsWithDefinedColor}/>
        case "delete":
            return <MaterialCommunityIcons name="delete-outline" {...propsWithDefinedColor}/>
        case "add":
            return <MaterialCommunityIcons name={"plus"} {...propsWithDefinedColor}/>
        case "configure":
            return <MaterialIcons name={"settings"} {...propsWithDefinedColor}/>
        case "plus":
            return <MaterialCommunityIcons name={"plus"} {...propsWithDefinedColor}/>
        case "money":
            return <FontAwesome5  name="money-bill" {...propsWithDefinedColor} />
        case "notes":
            return <MaterialCommunityIcons name="notebook-outline" {...propsWithDefinedColor}  />
        case "calendar":
            return <MaterialCommunityIcons name="calendar" {...propsWithDefinedColor} />
        case "category":
            return <MaterialIcons name="class" {...propsWithDefinedColor} />

    }
}
