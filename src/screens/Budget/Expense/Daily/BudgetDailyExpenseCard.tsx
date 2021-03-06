import React from "react";
import {DailyExpense} from "./BudgetDailyExpenseHook";
import {Card, Column, LinearProgressBar, Row} from "../../../../components";
import {Text} from "react-native";
import {formatMoney, isMore, sumMoney} from "../../../../models/Money";
import {useErrorColor, usePrimaryColor} from "../../../../contexts/ThemeContext";

type Props = {
    dailyExpense: DailyExpense
}
export const BudgetDailyExpenseCard = ({dailyExpense}:Props) => {
    const currentlySpent = sumMoney(dailyExpense.expenses.map(it => it.value))
    const valid = usePrimaryColor()
    const invalid = useErrorColor()
    const color = isMore(currentlySpent, dailyExpense.max) ? invalid : valid
    return (
        <Card padding={16}>
            <Column>
                <Row justifyContent={"space-between"}>
                    <Text>{formatMoney(currentlySpent)}</Text>
                    <Text>{formatMoney(dailyExpense.max)}</Text>
                </Row>
                <Row>
                    <LinearProgressBar current={currentlySpent.amount} max={dailyExpense.max.amount} color={color} />
                </Row>
            </Column>
        </Card>
    )
}
