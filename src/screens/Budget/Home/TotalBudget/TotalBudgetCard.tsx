import React, {useMemo} from "react";
import {Card, Column, Expanded, LinearProgressBar, Row} from "../../../../components";
import {FlatList, StyleSheet, Text} from "react-native";
import {BudgetCategory, BudgetExpense, sumBudgetExpenses} from "../../../../store/models";
import {copyCurrency, formatMoney, Money, sumMoney} from "../../../../models";
import {usePrimaryColor} from "../../../../contexts/ThemeContext";
import {LineSpacer} from "../LineSpacer";
import {TotalBudgetCategory} from "./TotalBudgetCategory";
import {useTotalBudgetCard} from "./TotalBudgetHook";

type Props = {
    totalBudget: Money,
    budgetExpenses: ReadonlyArray<BudgetExpense>,
    budgetCategories: ReadonlyArray<BudgetCategory>
}

export function TotalBudgetCard(props: Props) {
    const totalBudgetCard = useTotalBudgetCard(props.totalBudget, props.budgetExpenses, props.budgetCategories);
    const color = usePrimaryColor()
    return (
        <Card>
            <Column padding={16}>
                <Text style={styles.cardHeader}>Total Budget</Text>
                <Row paddingHorizontal={4} paddingTop={8} paddingBottom={4}>
                    <Text>{formatMoney(totalBudgetCard.totalSpent)}</Text>
                    <Expanded/>
                    <Text>{formatMoney(props.totalBudget)}</Text>
                </Row>
                <LinearProgressBar
                    current={totalBudgetCard.totalSpent.amount}
                    max={props.totalBudget.amount}
                    color={color}/>
            </Column>
            <LineSpacer color={"rgba(0,0,0,0.13)"}/>
            {totalBudgetCard.totalBudgetCategories.map(it => (
                <TotalBudgetCategory
                    key={it.name}
                    name={it.name}
                    spent={it.spent}
                    total={it.total}/>
            ))}
        </Card>
    )
}


const styles = StyleSheet.create({
    cardHeader: {
        fontSize: 18,
        fontWeight: "bold"
    },
    progress: {
        flexDirection: "column",
        alignItems: "center"
    },

    progressText: {
        fontSize: 18
    }
})
