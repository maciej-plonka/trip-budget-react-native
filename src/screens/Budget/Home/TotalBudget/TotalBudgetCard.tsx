import React from "react";
import {Button, Card, Column, Expanded, Icon, LinearProgressBar, Row} from "../../../../components";
import { StyleSheet, Text} from "react-native";
import {BudgetCategory, BudgetExpense} from "../../../../store/models";
import {formatMoney, Money} from "../../../../models";
import {usePrimaryColor} from "../../../../contexts/ThemeContext";
import {LineSpacer} from "../LineSpacer";
import {TotalBudgetCategory} from "./TotalBudgetCategory";
import {useTotalBudgetCard} from "./TotalBudgetHook";

type Props = {
    totalBudget: Money,
    budgetExpenses: ReadonlyArray<BudgetExpense>,
    budgetCategories: ReadonlyArray<BudgetCategory>
    navigateToBudgetEdit: () => void,
    navigateToBudgetCategoryEdit: () => void
}

export function TotalBudgetCard(props: Props) {
    const totalBudgetCard = useTotalBudgetCard(props.totalBudget, props.budgetExpenses, props.budgetCategories);
    const color = usePrimaryColor()
    return (
        <Card>
            <Column padding={16}>
                <Row justifyContent={"space-between"} alignItems={"center"}>
                    <Text style={styles.cardHeader}>Total Budget</Text>
                    <Button onClick={props.navigateToBudgetEdit} color={"primary"} style={styles.configureButton} >
                        <Icon iconType={"configure"} size={12}/>
                    </Button>
                </Row>
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
            <Column padding={16}>
                <Row marginBottom={8} justifyContent={"space-between"} alignItems={"center"}>
                    <Text style={styles.categoriesHeading}>Categories</Text>
                    <Button onClick={props.navigateToBudgetCategoryEdit} color={"primary"} style={styles.configureButton} >
                        <Icon iconType={"configure"} size={12}/>
                    </Button>
                </Row>
                {totalBudgetCard.totalBudgetCategories.map(it => (
                    <TotalBudgetCategory
                        key={it.name}
                        name={it.name}
                        spent={it.spent}
                        total={it.total}/>
                ))}
            </Column>

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

    categoriesHeading: {
        fontSize: 16,
        fontWeight: "bold"
    },

    progressText: {
        fontSize: 18
    },

    configureButton: {
        padding: 10,
    }
})
