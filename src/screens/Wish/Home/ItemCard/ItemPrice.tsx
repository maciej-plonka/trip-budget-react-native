import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {formatMoney, isEqual, isMore} from "../../../../models";
import {useSelector} from "react-redux";
import {selectBudgetExpenseById} from "../../../../store/selectors";
import {BudgetExpense, Wish} from "../../../../store/models";

type Props = {
    item: Wish
}

const OnlyPrice = ({item}: Props) => (
    <View style={styles.root}>
        <Text style={styles.price}>{formatMoney(item.targetValue)}</Text>
    </View>
)
const PriceWithExpense = ({item, expense}: Props & { expense: BudgetExpense }) => {
    if (isEqual(item.targetValue, expense.value)) {
        return (<OnlyPrice item={item}/>)
    }
    const paidMore = isMore(expense.value, item.targetValue)
    const newValueStyle = paidMore ? styles.worsePrice : styles.betterPrice
    const previousValueStyle = [styles.previousPrice]
    return (
        <View style={styles.root}>
            <Text style={newValueStyle}>{formatMoney(expense.value)}</Text>
            <Text style={previousValueStyle}>{formatMoney(item.targetValue)}</Text>
        </View>
    )
}

export const ItemPrice = ({item}: Props) => {
    const expense = item.budgetExpenseId && useSelector(selectBudgetExpenseById(item.budgetExpenseId))
    return expense ? (<PriceWithExpense item={item} expense={expense}/>) : (<OnlyPrice item={item}/>)
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        padding: 8,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    price: {
        color: "black"
    },
    betterPrice: {
        color: "#72EF95",
    },
    worsePrice: {
        color: "#EF7297"
    },
    previousPrice: {
        fontSize: 12,
        color: "#B5B5B5",
        textDecorationLine: "line-through"
    }
});
