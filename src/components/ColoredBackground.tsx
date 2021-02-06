import React from "react";
import {View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Color, isGradient} from "../models/Colors";
import {Parent, Styled} from "./Blocks";

type Props = Styled & Parent & {
    color: Color,
}

const plainBackgroundColor = (backgroundColor: string) => ({backgroundColor})

export const ColoredBackground = ({color, style, children}: Props) => {
    if (!isGradient(color)) {
        return (
            <View style={[plainBackgroundColor(color), style]}>
                {children}
            </View>
        )
    }
    const {colors, start, end} = color
    return (
        <LinearGradient style={style} colors={colors} start={start} end={end}>
            {children}
        </LinearGradient>
    )

}
