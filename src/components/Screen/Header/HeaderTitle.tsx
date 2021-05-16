import React, {FC} from "react";
import {Color, isGradient} from "../../../models";
import {StyleSheet, Text} from "react-native";

type Props = {
    title: string,
    color: Color
}


export const HeaderTitle:FC<Props> = ({title, color}) => {
    const titleTextStyle = [styles.titleText, {color: isGradient(color) ? "white" : "black"}];
    return (
        <Text style={titleTextStyle}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
    },
    title: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 24
    }
});
