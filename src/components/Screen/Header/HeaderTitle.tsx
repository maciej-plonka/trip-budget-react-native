import React, {FC} from "react";
import {Color, isGradient} from "../../../models/Colors";
import {StyleSheet, View, Text} from "react-native";
type Props = {
    title: string,
    color: Color
}


export const HeaderTitle:FC<Props> = ({title, color}) => {
    const titleWrapperStyle = [styles.title, isGradient(color) && styles.titleLeft];
    const titleTextStyle = [styles.titleText, {color: isGradient(color) ? "white" : "black"}];
    return (
        <View style={titleWrapperStyle}>
            <Text style={titleTextStyle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    titleLeft: {
        justifyContent: "flex-end",
        marginBottom: 16,
        marginLeft: 8
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 24
    }
});
