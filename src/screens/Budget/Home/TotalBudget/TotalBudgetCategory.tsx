import {Expanded, Row} from "../../../../components";
import {StyleSheet, Text} from "react-native";
import {formatMoney, Money} from "../../../../models";
import React from "react";

type Props = {
    name: string,
    spent: Money,
    total: Money
}

export function TotalBudgetCategory(props: Props) {
    return (
        <Row>
            <Text style={styles.categoryName}>{props.name}</Text>
            <Expanded/>
            <Text>{formatMoney(props.spent)}</Text>
            <Text style={styles.moneySeparator}>/</Text>
            <Text>{formatMoney(props.total)}</Text>
        </Row>
    )
}

const styles = StyleSheet.create({
    categoryName: {
        fontSize: 16
    },
    moneySeparator: {
        paddingHorizontal: 4,
        color: "rgba(0,0,0,0.75)"
    }

})
