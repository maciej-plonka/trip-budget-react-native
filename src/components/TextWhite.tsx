import React from "react";
import {StyleProp, StyleSheet, Text, ViewStyle} from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>
    children: string
}
export const TextWhite = ({children, style}: Props) => (
    <Text style={[styles.baseText, style]}>{children}</Text>
)

const styles = StyleSheet.create({
    baseText: {
        color: "white"
    }
})
