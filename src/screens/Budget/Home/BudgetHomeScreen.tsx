import React from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Card, CircularProgressBar, Column, Row, Screen} from "../../../components";
import {useBudgetBottomDrawerNavigation} from "../BudgetBottomDrawerNavigation";
import {useBudgetHome} from "./BudgetHomeHook";
import {usePrimaryColor} from "../../../contexts/ThemeContext";
import {View} from "react-native";

export const BudgetHomeScreen = ({navigation, route}: BudgetNavigationProps<"BudgetHomeScreen">) => {
    const {tripId} = route.params;
    const bottomDrawerNavigation = useBudgetBottomDrawerNavigation(navigation, tripId);
    const budgetHome = useBudgetHome(tripId);
    if (!budgetHome) return (<View/>)
    return (
        <Screen>
            <Screen.Header title={"Trip budget"} color={"budget"}/>
            <Screen.Content>
                <Column padding={16}>
                    <Card padding={16}>
                        <Column>
                            <Row justifyContent={"center"}>
                                <CircularProgressBar
                                        size={128}
                                        bevel={16}
                                        color={usePrimaryColor()}
                                        current={budgetHome.totalBudgetSpent.amount}
                                        max={budgetHome.totalBudget.amount}/>
                            </Row>
                            <Row >

                            </Row>
                        </Column>
                    </Card>
                </Column>
            </Screen.Content>
            <Screen.Fab onClick={() => {
            }} position={"center"}/>
            <Screen.BottomDrawer current={"budget"} onNavigate={bottomDrawerNavigation}/>
        </Screen>
    )
}
