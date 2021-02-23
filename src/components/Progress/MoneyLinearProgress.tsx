import React from "react";
import {formatMoney, Money} from "../../models/Money";
import {Color} from "../../models/Colors";
import {StyleSheet, Text, View} from "react-native";
import {LinearProgressBar} from "./LinearProgressBar";


type Props = {
    current: Money,
    max: Money,
    color: Color
}



export const MoneyLinearProgressBar = ({current, max, color}:Props) => {
    return (
        <View style={styles.root}>
            <View style={styles.names}>
                <Text>{formatMoney(current)}</Text>
                <Text>{formatMoney(max)}</Text>
            </View>
            <LinearProgressBar current={current.amount} max={max.amount} color={color}/>
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
});
