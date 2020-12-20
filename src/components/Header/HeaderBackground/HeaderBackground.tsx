import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

type Props = {
    color: string | Gradient,
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
}

const HeaderBackground = ({color, children, style}: Props) => {
    if (typeof color === "string") {
        const backgroundStyle = {backgroundColor: color}
        return (
            <View style={[backgroundStyle, StyleSheet.absoluteFill, style]}>
                {children}
            </View>
        )
    }
    const {colors, start, end} = color
    return (
        <LinearGradient colors={colors} start={start} end={end} style={[StyleSheet.absoluteFill, style]}>
            {children}
        </LinearGradient>
    )
}
export default HeaderBackground;
