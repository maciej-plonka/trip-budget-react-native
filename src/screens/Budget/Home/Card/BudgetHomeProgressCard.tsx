import React from "react";
import {Card, CircularProgressBar, Column, Row, Space} from "../../../../components";
import {Money} from "../../../../models/Money";
import {CategoryExpense} from "../BudgetHomeHook";
import {useBudgetHomeCard} from "./BudgetHomeCardHook";
import {StyleSheet, Text, View} from "react-native";

type Props = {
    totalBudget: Money,
    totalBudgetSpent: Money,
    categoryExpenses: ReadonlyArray<CategoryExpense>
}

const progressStyle = (maxWidth?: number) => [
    styles.progress,
    maxWidth != undefined && {maxWidth}
]

export const BudgetHomeProgressCard = (props: Props) => {
    const budgetHomeCard = useBudgetHomeCard(props.totalBudget, props.totalBudgetSpent, props.categoryExpenses)
    const {itemWidth, mainItem, onLayout, items} = budgetHomeCard
    return (
        <Card padding={16}>
            <Column>
                <Row justifyContent={"center"}>
                    <View style={progressStyle()}>
                        <CircularProgressBar size={108} bevel={16} fontSize={18} {...mainItem}/>
                        <Text style={styles.progressText}> {mainItem.name}</Text>
                    </View>
                </Row>
                <Space direction={"vertical"} size={8}/>
                <Row justifyContent={"space-between"} onLayout={onLayout}>
                    {itemWidth > 0 && items.map((item, index) => (
                        <View style={progressStyle(itemWidth)}  key={index}>
                            <CircularProgressBar size={itemWidth} bevel={14} fontSize={18} {...item} />
                            <Text style={styles.progressText}>{item.name}</Text>
                        </View>
                    ))}
                </Row>
            </Column>
        </Card>
    )
}


const styles = StyleSheet.create({
    progress: {
        flexDirection: "column",
        alignItems: "center"
    },

    progressText: {
        fontSize: 18
    }
})
