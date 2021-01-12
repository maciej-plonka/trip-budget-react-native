import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {BudgetExpense, Wish} from "../../../../store/states";
import {formatMoney, isEqual, isMore} from "../../../../models/Money";
import {useSelector} from "react-redux";
import {selectBudgetExpenseById} from "../../../../store/selectors";

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
    const newValueStyle = [paidMore && styles.worsePrice, !paidMore && styles.previousPrice]
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
    return !expense
        ? (<OnlyPrice item={item}/>)
        : (<PriceWithExpense item={item} expense={expense}/>)
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        padding: 8,
        alignItems: "flex-start",
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
        color: "#B5B5B5"
    }
});
