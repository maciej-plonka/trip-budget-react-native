import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

interface HeaderBackground {
    color: string | [string, string],
    children?: Array<JSX.Element | undefined>,
    style?: StyleProp<ViewStyle>
}

const HeaderBackground = ({color, children, style}: HeaderBackground) => {
    if (typeof color === "string") {
        const backgroundStyle = {backgroundColor: color}
        return (
            <View style={[backgroundStyle, StyleSheet.absoluteFill, style]}>
                {children}
            </View>
        )
    }
    return (
        <LinearGradient colors={color} start={[0, 1]} end={[1, 0]} style={[StyleSheet.absoluteFill, style]}>
            {children}
        </LinearGradient>
    )
}
export default HeaderBackground;
