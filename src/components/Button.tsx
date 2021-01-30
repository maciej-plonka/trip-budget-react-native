import React from "react";
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";
import {ColoredBackground} from "./ColoredBackground";
import {ButtonColor, useButtonColor} from "../contexts/ThemeContext";

export type ButtonProps = {
    onClick: () => void,
    color: ButtonColor
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
}

export const Button = ({onClick, style, color, children}: ButtonProps) => {
    const buttonColor = useButtonColor(color)
    return (
        <TouchableOpacity onPress={onClick}>
            <ColoredBackground style={[styles.background, style]} color={buttonColor}>
                {children}
            </ColoredBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    background: {
        minWidth: 16,
        minHeight: 16,
        padding: 12,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
});
