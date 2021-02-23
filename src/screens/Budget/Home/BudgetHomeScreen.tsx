import React from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Box, Column, Screen, Space} from "../../../components";
import {useBudgetBottomDrawerNavigation} from "../BudgetBottomDrawerNavigation";
import {useBudgetHome} from "./BudgetHomeHook";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {BudgetHomeProgressCard} from "./Card";
import {BudgetHomeDailyExpense} from "./BudgetHomeDailyExpense";

export const BudgetHomeScreen = ({navigation, route}: BudgetNavigationProps<"BudgetHomeScreen">) => {
    const {tripId} = route.params;
    const bottomDrawerNavigation = useBudgetBottomDrawerNavigation(navigation, tripId);
    const budgetHome = useBudgetHome(tripId);
    if (!budgetHome) return (<View/>)
    const navigateToNewExpense = () => navigation.push("BudgetNewScreen", {tripId})
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
                                <TouchableOpacity onLongPress={() => navigation.push("BudgetDailyScreen", {tripId, dayTime: it.day.getTime()})}>
                                    <BudgetHomeDailyExpense dailyExpense={it} />
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

