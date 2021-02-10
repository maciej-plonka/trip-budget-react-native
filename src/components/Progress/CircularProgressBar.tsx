import React from "react";
import {Styled} from "../Blocks";
import {Color} from "../../models/Colors";
import {ColoredBackground} from "../ColoredBackground";
import {StyleProp, StyleSheet, Text, ViewStyle} from "react-native";

type Props = Styled & {
    color: Color,
    current: number,
    max: number,
    size: number,
    bevel: number,
}

const buildContainerStyles = (props: Props): StyleProp<ViewStyle>[] => {
    const {size} = props
    return [
        styles.container,
        props.style,
        {width: size, height: size},
        {borderRadius: size / 2}
    ]
}

const buildIndicatorStyles = (props: Props): StyleProp<ViewStyle>[] => {
    const {size, bevel} = props
    const targetSize = size - bevel
    return [
        styles.indicator,
        props.style,
        {width: targetSize, height: targetSize},
        {borderRadius: targetSize / 2}
    ]
}

const percentage = (props: Props) => Math.floor(props.current / props.max * 100) + "%"
export const CircularProgressBar = (props: Props) => {

    return (
        <ColoredBackground color={props.color} style={buildContainerStyles(props)}>
            <ColoredBackground color={"white"} style={buildIndicatorStyles(props)}>
                <Text style={{fontSize: 32}}>{percentage(props)}</Text>
            </ColoredBackground>
        </ColoredBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    indicator: {
        justifyContent: "center",
        alignItems: "center"
    }
})
