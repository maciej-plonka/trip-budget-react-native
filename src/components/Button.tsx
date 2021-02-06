import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {ColoredBackground} from "./ColoredBackground";
import {ButtonColor, useButtonColor} from "../contexts/ThemeContext";
import {Parent, Styled} from "./Blocks";

export type ButtonProps = Styled & Parent & {
    onClick: () => void,
    color: ButtonColor
    disabled?: boolean
}

const getButtonColor = (color: ButtonColor, disabled: boolean) => {
    const disabledColor = useButtonColor("disabled")
    const buttonColor = useButtonColor(color)
    return disabled ? disabledColor : buttonColor;

}

export const Button = ({onClick, style, color, children, disabled}: ButtonProps) => {
    const buttonColor = getButtonColor(color, !!disabled)
    const handleOnPress = () => !disabled && onClick();
    return (
        <TouchableOpacity onPress={handleOnPress}>
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
    },
});
