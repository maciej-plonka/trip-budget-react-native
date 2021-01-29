import React from "react";
import {Budget, sumCategoriesBudget} from "../store/states";
import {useSelector} from "react-redux";
import {selectBudgetCategoriesByBudgetId} from "../store/selectors";
import {Card} from "./Card";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useThemeContext} from "../contexts/ThemeContext";
import {MoneyLinearProgressBar} from "./Progress";

type Props = {
    budget: Readonly<Budget>,
    label?: string,
    onPress?: () => void
}

export const BudgetProgress = ({budget, label = "Budget", onPress}: Props) => {
    const categories = useSelector(selectBudgetCategoriesByBudgetId(budget.id))
    const theme = useThemeContext()
    const currentlySpent = sumCategoriesBudget(categories)
    return (
        <TouchableOpacity onLongPress={onPress} delayLongPress={200}>
            <Card style={styles.root}>
                {!!label?.length && <Text style={styles.label}>{label}</Text>}
               <MoneyLinearProgressBar color={theme.colors.primary} current={currentlySpent} max={budget.totalBudget} />
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        flexDirection: "column",
        padding: 16,
    },
    label: {
        marginBottom: 4,
    }
});
