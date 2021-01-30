import {isBought, Wish} from "../../../../../store/states";
import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {ColoredBackground} from "../../../../../components";
import {useThemeContext} from "../../../../../contexts/ThemeContext";
import {ItemButtonIcon} from "./ItemButtonIcon";

type Props = {
    item: Wish,
    onClick: () => void,
}

const getIcon = (item: Wish) => isBought(item) ? "bought" : "configure"


export const ItemButton = ({item, onClick}: Props) => {
    const theme = useThemeContext()
    const bought = isBought(item)
    const color = bought ? theme.colors.primary : theme.colors.secondary
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
