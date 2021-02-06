import React from "react";
import {Color} from "../../models/Colors";
import {ColoredBackground} from "../ColoredBackground";
import {StyleSheet} from "react-native";
import {Styled} from "../Blocks";

type Props = Styled & {
    current: number,
    max: number,
    color: Color,
}

const clamp = (value: number, min: number, max: number) => Math.max(min, (Math.min(max, value)));
const calculateCurrentPercent = (current: number, max: number) => clamp(Math.floor(current / max * 100), 0, 100);

export const LinearProgressBar = ({current, max, color, style}: Props) => {
    const progressFillStyle = {width: calculateCurrentPercent(current, max) + "%"};
    return (
        <ColoredBackground style={[styles.progressBackground, style]} color={"#E6EAF8"}>
            <ColoredBackground style={[styles.progressBar, progressFillStyle]} color={color}/>
        </ColoredBackground>
    )
}
const styles = StyleSheet.create({
    progressBackground: {
        width: "100%",
        height: 16,
        borderRadius: 8,
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    progressBar: {
        borderRadius: 8,
    }
});
