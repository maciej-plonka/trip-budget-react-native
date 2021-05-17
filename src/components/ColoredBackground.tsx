import React from "react";
import {LayoutChangeEvent, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Color, isGradient} from "../models";
import {Parent, Styled} from "./Blocks";

type Props = Styled & Parent & {
    color: Color,
    onLayout?: (event:  LayoutChangeEvent) => void
}

const plainBackgroundColor = (backgroundColor: string) => ({backgroundColor})

export const ColoredBackground = ({color, style, children, onLayout}: Props) => {
    if (!isGradient(color)) {
        return (
            <View style={[plainBackgroundColor(color), style]} onLayout={onLayout}>
                {children}
            </View>
        )
    }
    const {colors, start, end} = color
    return (
        <LinearGradient style={style} colors={colors} start={start} end={end} onLayout={onLayout}>
            {children}
        </LinearGradient>
    )

}
