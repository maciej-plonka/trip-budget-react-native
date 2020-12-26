import React from "react";
import Card from "../Card";
import {StyleSheet, Text, TouchableHighlight} from "react-native";
import LineProgressBar from "./LineProgressBar";
import {useThemeContext} from "../../contexts/ThemeContext";

type Props = {
    label?: string,
    maxValue: number,
    currentValue: number,
    currency?: Currency,
    onPress?: () => void,
    spaceBelow?: boolean
}
const BudgetProgress = ({label, maxValue, currentValue, spaceBelow, currency = "¥", onPress}: Props) => {
    const theme = useThemeContext()
    const range:RangeNumbers = [currentValue, maxValue]
    const rangeNames: RangeNames = [`${currentValue}${currency}`, `${maxValue}${currency}`]

    return (
        <TouchableHighlight onLongPress={onPress} delayLongPress={200}>
            <Card style={[styles.root, spaceBelow && styles.spaceBelow]}>
                {!!label?.length && <Text style={styles.label}>{label}</Text>}
                <LineProgressBar range={range} rangeNames={rangeNames} color={theme.colors.primary}/>
            </Card>
        </TouchableHighlight>

    )
}

const styles=  StyleSheet.create({
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

export default BudgetProgress;
