import React, {useMemo} from "react";
import {Card, Column, LinearProgressBar, Row, Space} from "../../../components";
import {StyleSheet, Text} from "react-native"
import {addDays, format, isSameDay} from "date-fns";
import {usePrimaryColor} from "../../../contexts/ThemeContext";
import {formatMoney, sumMoney} from "../../../models/Money";
import {DailyExpense} from "../Expense/Daily/BudgetDailyExpenseHook";

type Props = {
    dailyExpense: Readonly<DailyExpense>
}

const formatDayOfYear = (day: Date, today: Date = new Date()): string => {
    if (isSameDay(day, today))
        return "Today"
    const yesterday = addDays(today, -1)
    if (isSameDay(day, yesterday)) {
        return "Yesterday"
    }
    return format(day, "dd.MM.yyyy")
}

export const BudgetHomeDailyExpense = ({dailyExpense}: Props) => {
    const color = usePrimaryColor()
    const {day, max, expenses} = dailyExpense
    const spent = useMemo(() => sumMoney(expenses.map(it => it.value)), [expenses])
    return (
        <Card padding={16}>
            <Column>
                <Text style={styles.dayOfYear}>{formatDayOfYear(day)}</Text>
                <Space size={8} direction={"vertical"}/>
                <Row justifyContent={"space-between"}>
                    <Text>{formatMoney(spent)}</Text>
                    <Text>{formatMoney(max)}</Text>
                </Row>
                <LinearProgressBar max={max.amount} current={spent.amount} color={color}/>
            </Column>
        </Card>
    )
}

const styles = StyleSheet.create({
    dayOfYear: {
        fontSize: 18
    }
})
