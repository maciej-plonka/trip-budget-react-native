import React, {useEffect} from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Center, Column, Screen, Space} from "../../../components";
import {useBudgetBottomDrawerNavigation} from "../BudgetBottomDrawerNavigation";
import {useBudgetHome} from "./BudgetHomeHook";
import {ScrollView, Text} from "react-native";
import {DailyExpense} from "../Expense/Daily/BudgetDailyExpenseHook";
import {TotalBudgetCard} from "./TotalBudget";

export function BudgetHomeScreen({navigation, route}: BudgetNavigationProps<"BudgetHomeScreen">) {
    const {tripId} = route.params;
    const bottomDrawerNavigation = useBudgetBottomDrawerNavigation(navigation, tripId);
    const budgetHome = useBudgetHome(tripId);

    useEffect(() => {
        if (budgetHome.type == "NOT_FOUND")
            navigation.replace("BudgetNewScreen", {tripId})
    }, [budgetHome])

    function navigateToNewExpense() {
        if (budgetHome.type == "NOT_FOUND") return;
        navigation.push("BudgetExpenseNewScreen", {tripId, budgetId: budgetHome.budget.id})
    }

    function navigateToDailyExpense(dailyExpense: DailyExpense) {
        if (budgetHome.type == "NOT_FOUND") return;
        const dayTime = dailyExpense.day.getTime();
        const budgetId = budgetHome.budget.id;
        navigation.push("BudgetExpenseDailyScreen", {tripId, budgetId, dayTime})
    }

    if (budgetHome.type == "NOT_FOUND")
        return (
            <Center>
                <Text> Budget not found</Text>
            </Center>
        )

    return (
        <Screen>
            <Screen.Header title={"Trip budget"} color={"budget"}/>
            <Screen.Content>
                <ScrollView>
                    <Column padding={16} marginBottom={64}>
                        <TotalBudgetCard
                            totalBudget={budgetHome.budget.totalBudget}
                            budgetExpenses={budgetHome.budgetExpenses}
                            budgetCategories={budgetHome.budgetCategories}/>
                        <Space size={8} direction={"vertical"}/>
                    </Column>
                </ScrollView>
            </Screen.Content>
            <Screen.Fab onClick={navigateToNewExpense} position={"center"}/>
            <Screen.BottomDrawer current={"budget"} onNavigate={bottomDrawerNavigation}/>
        </Screen>
    )
}

