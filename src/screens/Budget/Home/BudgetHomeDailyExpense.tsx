import React from "react";
import {DailyExpense} from "./BudgetHomeHook";
import {Card, Column, LinearProgressBar, Row, Space} from "../../../components";
import {StyleSheet, Text} from "react-native"
import {DayOfYear, daysAreEqual, toDayOfYear} from "../../../store";
import {addDays} from "date-fns";
import {usePrimaryColor} from "../../../contexts/ThemeContext";
import {formatMoney} from "../../../models/Money";

type Props = {
    dailyExpense: Readonly<DailyExpense>
}

const formatDayOfYear = (dayOfYear: DayOfYear): string => {
    const now = new Date()
    if (daysAreEqual(dayOfYear, toDayOfYear(now)))
        return "Today"
    if (daysAreEqual(dayOfYear, toDayOfYear(addDays(now, -1)))) {
        return "Yesterday"
    }
    const fixZero = (value: number) => value < 10 ? "0" + value : "" + value
    const {year, month, day} = dayOfYear
    return `${fixZero(day)}.${fixZero(month)}.${year}`
}

export const BudgetHomeDailyExpense = ({dailyExpense}: Props) => {
    const color = usePrimaryColor()
    const {day,max,spent} = dailyExpense
    return (
        <Card padding={16}>
            <Column>
                <Text style={styles.dayOfYear}>{formatDayOfYear(day)}</Text>
                <Space size={8} direction={"vertical"} />
                <Row justifyContent={"space-between"}>
                    <Text>{formatMoney(spent)}</Text>
                    <Text>{formatMoney(max)}</Text>
                </Row>
                <LinearProgressBar max={max.amount} current={spent.amount} color={color} />
            </Column>
        </Card>
    )
}

const styles = StyleSheet.create({
    dayOfYear: {
        fontSize: 18
    }
})
