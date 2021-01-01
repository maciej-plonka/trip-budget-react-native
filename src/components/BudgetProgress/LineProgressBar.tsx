import React from "react";
import {StyleSheet, Text, View} from "react-native";
import ColoredBackground from "../ColoredBackground";
import {Color} from "../../models/Colors";

type Props = {
    range: RangeNumbers,
    rangeNames: RangeNames,
    color: Color
}

const calculateProgress = ([current, max]: RangeNumbers): number => {
    return max === 0 ? 100 : Math.floor(current * 100 / max);
}
const LineProgressBar = ({range, rangeNames, color}: Props) => {
    const progressFillStyle = {width: `${calculateProgress(range)}%`}
    return (
        <View style={styles.root}>
            <View style={styles.names}>
                <Text>{rangeNames[0]}</Text>
                <Text>{rangeNames[1]}</Text>
            </View>
            <ColoredBackground style={styles.progressBackground} color={"#E6EAF8"}>
                <ColoredBackground style={[styles.progressBar, progressFillStyle]} color={color}/>
            </ColoredBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        flexDirection: "column"
    },
    names: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
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

export default LineProgressBar;
