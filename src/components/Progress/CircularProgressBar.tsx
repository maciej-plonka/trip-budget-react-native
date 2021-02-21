import React from "react";
import {Styled} from "../Blocks";
import {Color} from "../../models/Colors";
import {ColoredBackground} from "../ColoredBackground";
import {StyleProp, StyleSheet, Text, ViewStyle} from "react-native";
import Svg, {Circle} from 'react-native-svg';

type Props = Styled & {
    color: Color,
    current: number,
    max: number,
    size: number,
    bevel: number,
    fontSize: number
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

const buildTextStyles = (props: Props) => {
    return [
        styles.text,
        {fontSize: props.fontSize},
        {marginTop: -props.fontSize / 4}
    ]
}

const percentage = (props: Props) => Math.floor(props.current / props.max * 100) + "%"

const offset = 2

const useCircularProgress = (props: Props) => {
    const r = Math.floor((props.size - props.bevel ) / 2)
    const circumference = Math.floor(r * 2 * Math.PI)
    const strokeDasharray = `${circumference} ${circumference}`
    const angle = props.current / props.max * Math.PI * 2
    const strokeDashoffset = Math.floor(-angle * r)
    const strokeWidth = props.bevel + offset
    const cx = (props.size + offset) / 2
    const cy = (props.size + offset) / 2
    const stroke = "#ececec"
    const fill = "none"
    return {r, strokeDasharray, strokeDashoffset, strokeWidth, cx, cy, stroke, fill }
}

export const CircularProgressBar = (props: Props) => {
    const circularProgress = useCircularProgress(props)
    return (
        <ColoredBackground color={props.color} style={buildContainerStyles(props)}>
            <Svg style={{position: "absolute", top: 0, left: 0}} width={props.size + offset} height={props.size + offset} rotation={180}>
                <Circle {...circularProgress} />
            </Svg>
            <ColoredBackground color={"white"} style={buildIndicatorStyles(props)}>
                <Text style={buildTextStyles(props)}>{percentage(props)}</Text>
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
        alignItems: "center",
        position: "absolute"
    },

    text: {
        color: "gray"
    }
})
