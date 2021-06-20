import React, {useCallback, useEffect} from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Center, Column, Screen, Space} from "../../../components";
import {useBudgetBottomDrawerNavigation} from "../BudgetBottomDrawerNavigation";
import {useBudgetHome} from "./BudgetHomeHook";
import {ScrollView, Text} from "react-native";
import {TotalBudgetCard} from "./TotalBudget";

export function BudgetHomeScreen({navigation, route}: BudgetNavigationProps<"BudgetHomeScreen">) {
    const {tripId} = route.params;
    const bottomDrawerNavigation = useBudgetBottomDrawerNavigation(navigation, tripId);
    const budgetHome = useBudgetHome(tripId);

    useEffect(() => {
        if (budgetHome.type == "NOT_FOUND")
            navigation.replace("BudgetNewScreen", {tripId})
    }, [budgetHome])

    const navigateToNewExpense = useCallback(() => {
        if (budgetHome.type == "NOT_FOUND") return;
        navigation.push("BudgetExpenseNewScreen", {tripId, budgetId: budgetHome.budget.id})
    }, [tripId, budgetHome])

    const navigateToBudgetEdit = useCallback(() => {
        if (budgetHome.type == "NOT_FOUND") return;
        navigation.push("BudgetEditScreen", {tripId, budgetId: budgetHome.budget.id})
    }, [tripId, budgetHome])

    const navigateToCategoryEdit = useCallback(() => {
        if (budgetHome.type == "NOT_FOUND") return;
        navigation.push("BudgetCategoryEditScreen", {tripId, budgetId: budgetHome.budget.id})
    }, [tripId, budgetHome])

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
                            budgetCategories={budgetHome.budgetCategories}
                            navigateToBudgetEdit={navigateToBudgetEdit}
                            navigateToBudgetCategoryEdit={navigateToCategoryEdit}/>
                        <Space size={8} direction={"vertical"}/>
                    </Column>
                </ScrollView>
            </Screen.Content>
            <Screen.Fab onClick={navigateToNewExpense} position={"center"}/>
            <Screen.BottomDrawer current={"budget"} onNavigate={bottomDrawerNavigation}/>
        </Screen>
    )
}

