import React, {FC, useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useHeader} from "./HeaderContext";
import {Color, isGradient} from "../../../models";

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
    const {isActive, selectTab, color} = useHeader()
    useEffect(() => {
        initial && selectTab(id)
    }, [])
    const selected = isActive(id)
    return (
        <TouchableOpacity onPress={() => selectTab(id)} style={styles.touchable}>
            <Text style={textStyle(color, selected)}>{title}</Text>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    tabText: {
        color: "rgba(0,0,0,0.5)",
        textAlign: "center"
    },
    touchable: {
        flex: 1,
        padding: 8,
        justifyContent: "center",
        alignItems: "center"
    }
})
