import React from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

type Props = {
    children?:React.ReactNode,
    color: string | Gradient,
    style?: StyleProp<ViewStyle>
}
const FormButtonBackground = ({color, children, style}: Props) => {
    if (typeof color === 'string') {
        return <View style={style}>
            {children}
        </View>
    }
    const {colors, start, end} = color
    return (
        <LinearGradient style={style} colors={colors} start={start} end={end}>
            {children}
        </LinearGradient>
    )
}

export default FormButtonBackground;
