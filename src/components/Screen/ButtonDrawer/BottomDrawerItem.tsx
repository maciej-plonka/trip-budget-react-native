import {TouchableOpacity} from "react-native";
import {Box} from "../../Blocks";
import React, {useMemo} from "react";
import {NavigationTarget} from "./BottomDrawer";
import {Icons} from "../../../icons";

type BottomDrawerItemProps = {
    item: NavigationTarget,
    onClick: () => void,
    selected: boolean
}
export const BottomDrawerItem = ({onClick, ...props}: BottomDrawerItemProps) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <Box paddingVertical={8} paddingHorizontal={12}>
                <BottomDrawerIcon {...props} />
            </Box>
        </TouchableOpacity>
    )
}

type BottomDrawerIconProps = {
    item: NavigationTarget,
    selected: boolean
}

const iconSize = 32

const BottomDrawerIcon = ({item, selected}: BottomDrawerIconProps) => {
    const color = useMemo(() => selected ? "black" : "gray", [selected])
    switch (item) {
        case "budget":
            return (<Icons.Coins fill={color} width={iconSize} height={iconSize}/>)
        case "wish":
            return (<Icons.ShoppingList fill={color} width={iconSize} height={iconSize}/>)
    }
}
