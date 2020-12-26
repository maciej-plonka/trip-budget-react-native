import React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

type Props = {
    color: Color,
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
}
const ColoredBackground = ({color, style, children}: Props) => {
    if (typeof color === 'string') {
        const backgroundColor = {backgroundColor: color}
        return (
            <View style={[backgroundColor, style]}>
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

export default ColoredBackground;