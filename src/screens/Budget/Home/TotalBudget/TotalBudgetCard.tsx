import React, {useMemo} from "react";
import {Card, Column, Expanded, LinearProgressBar, Row} from "../../../../components";
import {FlatList, StyleSheet, Text} from "react-native";
import {BudgetCategory, BudgetExpense, sumBudgetExpenses} from "../../../../store/models";
import {copyCurrency, formatMoney, Money, sumMoney} from "../../../../models";
import {usePrimaryColor} from "../../../../contexts/ThemeContext";
import {LineSpacer} from "../LineSpacer";
import {TotalBudgetCategory} from "./TotalBudgetCategory";

type Props = {
    totalBudget: Money,
    budgetExpenses: ReadonlyArray<BudgetExpense>,
    budgetCategories: ReadonlyArray<BudgetCategory>
}


function useTotalBudgetCard(totalBudget: Money, budgetExpenses: ReadonlyArray<BudgetExpense>, budgetCategories: ReadonlyArray<BudgetCategory>) {
    const totalSpent = useMemo(() => sumBudgetExpenses(budgetExpenses), [budgetExpenses])
    const totalBudgetCategories = useMemo(() => {
        const categories = budgetCategories.map(category => ({
            name: category.name,
            spent: sumBudgetExpenses(budgetExpenses.filter(it => it.categoryId === category.id)),
            total: category.categoryBudget
        })).sort((left, right) => right.spent.amount - left.spent.amount)
        const totalFromOtherCategories = sumMoney(categories.map(it => it.total));
        const spentFromOtherCategories = sumMoney(categories.map(it => it.spent));
        const essentials = {
            name: "Essentials",
            spent: copyCurrency(totalSpent, totalSpent.amount - spentFromOtherCategories.amount),
            total: copyCurrency(totalBudget, totalBudget.amount - totalFromOtherCategories.amount)
        }
        return [essentials, ...categories]
    }, [totalSpent, totalBudget, budgetExpenses, budgetCategories])
    return {totalSpent, totalBudgetCategories}
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
            <FlatList data={totalBudgetCard.totalBudgetCategories} renderItem={({item}) => {
                return (
                    <TotalBudgetCategory
                        name={item.name}
                        spent={item.spent}
                        total={item.total}/>
                )
            }}/>
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
