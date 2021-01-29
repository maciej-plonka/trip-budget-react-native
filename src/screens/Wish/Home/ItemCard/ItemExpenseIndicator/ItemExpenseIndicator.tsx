import {isBought, Wish} from "../../../../../store/states";
import {StyleSheet} from "react-native";
import React from "react";
import {ColoredBackground} from "../../../../../components";
import {useThemeContext} from "../../../../../contexts/ThemeContext";
import {ItemButtonIcon} from "./ItemButtonIcon";

type Props = {
    item: Wish
}

export const ItemExpenseIndicator = ({item}: Props) => {
    const theme = useThemeContext()
    const bought = isBought(item)
    const color = bought ? theme.colors.primary : theme.colors.secondary
    const icon = bought ? "bought" : "buy"
    return (
        <ColoredBackground style={styles.iconWrapper} color={color}>
            <ItemButtonIcon icon={icon}/>
        </ColoredBackground>
    )
}


const styles = StyleSheet.create({
    iconWrapper: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 48,
        justifyContent: "center",
        alignItems: "center"
    }
});
