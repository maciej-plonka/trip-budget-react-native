import React from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Box, Column, Screen, Space} from "../../../components";
import {useBudgetBottomDrawerNavigation} from "../BudgetBottomDrawerNavigation";
import {useBudgetHome} from "./BudgetHomeHook";
import {ScrollView, View} from "react-native";
import {BudgetHomeProgressCard} from "./Card";
import {BudgetHomeDailyExpense} from "./BudgetHomeDailyExpense";

export const BudgetHomeScreen = ({navigation, route}: BudgetNavigationProps<"BudgetHomeScreen">) => {
    const {tripId} = route.params;
    const bottomDrawerNavigation = useBudgetBottomDrawerNavigation(navigation, tripId);
    const budgetHome = useBudgetHome(tripId);
    if (!budgetHome) return (<View/>)
    const navigateToNewExpense = () => navigation.push("budgetNewScreen", {tripId})
    return (
        <Screen>
            <Screen.Header title={"Trip budget"} color={"budget"}/>
            <Screen.Content>
                <ScrollView>
                    <Column padding={16} marginBottom={64} >
                        <BudgetHomeProgressCard {...budgetHome} />
                        <Space  size={8} direction={"vertical"}/>
                        {budgetHome.dailyExpenses.map((it, index) => (
                            <Box key={index} marginVertical={8}>
                                <BudgetHomeDailyExpense dailyExpense={it} />
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

