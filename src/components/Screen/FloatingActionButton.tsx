import React, {FC} from "react";
import {useThemeContext} from "../../contexts/ThemeContext";
import {StyleSheet, TouchableOpacity} from "react-native";
import {ColoredBackground} from "../ColoredBackground";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export type FABProps = {
    onClick: () => void
}
export const FloatingActionButton:FC<FABProps> = ({onClick}) => {
    const color = useThemeContext().colors.fab
    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <ColoredBackground color={color} style={[StyleSheet.absoluteFill, styles.fab]}>
                <MaterialCommunityIcons name={"plus"} size={48} color={"white"}/>
            </ColoredBackground>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 16,
        width: 62,
        height: 62,
        right: 16,
    },
    fab: {
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    }

})
