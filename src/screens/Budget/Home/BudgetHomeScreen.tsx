import React, {useEffect} from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Box, Column, Screen, Space} from "../../../components";
import {useBudgetBottomDrawerNavigation} from "../BudgetBottomDrawerNavigation";
import {useBudgetHome} from "./BudgetHomeHook";
import {ScrollView, TouchableOpacity} from "react-native";
import {BudgetHomeProgressCard} from "./Card";
import {BudgetHomeDailyExpense} from "./BudgetHomeDailyExpense";
import {DailyExpense} from "../Expense/Daily/BudgetDailyExpenseHook";

export const BudgetHomeScreen = ({navigation, route}: BudgetNavigationProps<"BudgetHomeScreen">) => {
    const {tripId} = route.params;
    const bottomDrawerNavigation = useBudgetBottomDrawerNavigation(navigation, tripId);
    const budgetHome = useBudgetHome(tripId);

    useEffect(() => {
        !budgetHome.budgetId && navigation.replace("BudgetNewScreen", {tripId})
    }, [budgetHome.budgetId])

    const navigateToNewExpense = () => {
        if (!budgetHome.budgetId) return;
        navigation.push("BudgetExpenseNewScreen", {tripId, budgetId: budgetHome.budgetId})
    }

    const navigateToDailyExpense = (dailyExpense: DailyExpense) => {
        if (!budgetHome.budgetId) return;
        const dayTime = dailyExpense.day.getTime();
        const budgetId = budgetHome.budgetId;
        navigation.push("BudgetExpenseDailyScreen", {tripId, budgetId, dayTime})
    }
    return (
        <Screen>
            <Screen.Header title={"Trip budget"} color={"budget"}/>
            <Screen.Content>
                <ScrollView>
                    <Column padding={16} marginBottom={64}>
                        <BudgetHomeProgressCard {...budgetHome} />
                        <Space size={8} direction={"vertical"}/>
                        {budgetHome.dailyExpenses.map((it, index) => (
                            <Box key={index} marginVertical={8}>
                                <TouchableOpacity onLongPress={() =>navigateToDailyExpense(it)}>
                                    <BudgetHomeDailyExpense dailyExpense={it}/>
                                </TouchableOpacity>
                            </Box>
                        ))}
                    </Column>
                </ScrollView>
            </Screen.Content>
            <Screen.Fab onClick={navigateToNewExpense} position={"center"}/>
            <Screen.BottomDrawer current={"budget"} onNavigate={bottomDrawerNavigation}/>
        </Screen>
    )
}

