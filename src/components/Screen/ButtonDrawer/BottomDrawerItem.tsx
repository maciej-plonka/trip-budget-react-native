import {Icon, IconType} from "../../Icon";
import {Text, TouchableOpacity} from "react-native";
import {Column} from "../../Blocks";
import React from "react";
import {NavigationTarget} from "./BottomDrawer";

const getIcon = (target: NavigationTarget): IconType => {
    switch (target) {
        case "budget":
            return "money";
        case "wish":
            return "cart"
    }
}

const itemColor = (selected: boolean):string => selected ? "black" : "gray"

type BottomDrawerItemProps = {
    item: NavigationTarget,
    onClick: () => void,
    selected: boolean
}
export const BottomDrawerItem = ({onClick, item, selected}: BottomDrawerItemProps) => {
    const color = itemColor(selected);
    return (
        <TouchableOpacity onPress={onClick}>
            <Column alignItems={"center"} justifyContent={"flex-end"} padding={8}>
                <Icon iconType={getIcon(item)} size={24} color={color}/>
                <Text style={{fontSize: 10, marginTop: 4, color}}>{item}</Text>
            </Column>
        </TouchableOpacity>
    )
}

