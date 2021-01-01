import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Card from "../Card";
import LineProgressBar from "./LineProgressBar";
import React from "react";
import {useThemeContext} from "../../contexts/ThemeContext";
import {Money} from "../../models/Money";

type Props = {
    label?: string,
    maxValue: Money,
    currentValue: Money,
    onPress?: () => void,
    spaceBelow?: boolean
}

const formatMoney = ({amount, currency}: Money) => `${amount}${currency}`

export const Progress = ({currentValue,maxValue,onPress,label,spaceBelow}:Props) => {
    const theme = useThemeContext()
    const clampedCurrent = Math.max(0,Math.min(maxValue.amount, currentValue.amount))
    const range:RangeNumbers = [clampedCurrent, maxValue.amount]
    const rangeNames: RangeNames = [formatMoney(currentValue), formatMoney(maxValue)];
    return <TouchableOpacity onLongPress={onPress} delayLongPress={200}>
        <Card style={[styles.root, spaceBelow && styles.spaceBelow]}>
            {!!label?.length && <Text style={styles.label}>{label}</Text>}
            <LineProgressBar range={range} rangeNames={rangeNames} color={theme.colors.primary}/>
        </Card>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        padding: 16,
        marginBottom: 8,
    },
    spaceBelow: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,

    }
})