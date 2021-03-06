import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Box, Card, Column, Row} from "../../../../components";
import {BudgetCategory, BudgetExpense} from "../../../../store/models";
import {DailyExpense} from "./BudgetDailyExpenseHook";
import {findBy} from "../../../../utils/Collections";
import {formatMoney} from "../../../../models";

type Props = {
    dailyExpense: Readonly<DailyExpense>,
    categories: ReadonlyArray<BudgetCategory>
    onNavigate: (item: BudgetExpense) => void
}

export const BudgetDailyExpenseList = ({dailyExpense, categories, onNavigate}: Props) => {
    return (
        <FlatList
            data={dailyExpense.expenses}
                  renderItem={({item}) => (
                      <Box marginVertical={4}>
                          <TouchableOpacity onLongPress={() => onNavigate(item)}>
                              <BudgetDailyExpense categories={categories} expense={item} />
                          </TouchableOpacity>
                      </Box>
                  )}
            />
    )
}


type BudgetDailyExpenseProps = {
    expense: Readonly<BudgetExpense>
    categories: ReadonlyArray<BudgetCategory>
}
const BudgetDailyExpense = ({expense, categories}: BudgetDailyExpenseProps) => {
    const category = expense.categoryId && findBy(categories, "id", expense.categoryId)?.name || "Essential"
    return (
        <Card rounded paddingVertical={8} paddingHorizontal={16}>
            <Row justifyContent={"space-between"} alignItems={"center"}>
                <Column>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.name}>{expense.name}</Text>
                </Column>
                <Text style={styles.price}>{formatMoney(expense.value)}</Text>
            </Row>
        </Card>
    )
}


const styles = StyleSheet.create({
    category: {
        fontSize: 16,
        color: "gray"
    },
    name: {
        fontSize: 12,
    },
    price: {
        fontSize: 14
    }
})
