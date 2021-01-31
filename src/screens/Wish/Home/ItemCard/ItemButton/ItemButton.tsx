import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {ColoredBackground} from "../../../../../components";
import {usePrimaryColor, useSecondaryColor} from "../../../../../contexts/ThemeContext";
import {ItemButtonIcon} from "./ItemButtonIcon";
import {isBought, Wish} from "../../../../../store/models";

type Props = {
    item: Wish,
    onClick: () => void,
}

const getIcon = (item: Wish) => isBought(item) ? "bought" : "configure"

const useWishColor  = (item: Wish) => {
    const primary = usePrimaryColor()
    const secondary = useSecondaryColor()
    return isBought(item) ? primary : secondary;
}

export const ItemButton = ({item, onClick}: Props) => {
    const color = useWishColor(item)
    return (
        <TouchableOpacity style={styles.root}  onPress={onClick}>
            <ColoredBackground style={styles.icon} color={color}>
                <ItemButtonIcon icon={getIcon(item)}/>
            </ColoredBackground>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    root: {
        width: 48,
    },
    icon: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }

});
