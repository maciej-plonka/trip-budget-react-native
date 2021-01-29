import React, {FC, useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useHeaderCtx} from "./HeaderContext";
import {Color, isGradient} from "../../../models/Colors";

export type HeaderTabProps = {
    title: string,
    id?: string,
    initial?: boolean
}


const textStyle = (color: Color, selected: boolean) => [
    styles.tabText,
    selected && {color: isGradient(color) ? "white" : "black"},
]


export const HeaderTab: FC<HeaderTabProps> = ({title, initial, id = title}) => {
    const {isActive, selectTab, color} = useHeaderCtx()
    useEffect(() => {
        initial && selectTab(id)
    }, [initial])
    const selected = isActive(id)
    return (
        <TouchableOpacity style={styles.tab} onPress={() => selectTab(id)}>
            <Text style={textStyle(color, selected)}>{title}</Text>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    tab: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingVertical: 8,
    },

    tabText: {
        color: "rgba(0,0,0,0.5)",
        width: "100%",
        textAlign: "center"

    }
})
