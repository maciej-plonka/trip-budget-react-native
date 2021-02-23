import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {BudgetDailyScreen, BudgetEditScreen, BudgetHomeScreen, BudgetNewScreen} from "../../screens";
import {BudgetParamList} from "./BudgetNavigationProps";
import {RootNavigationProps} from "../RootNavigationProps";

const Stack = createStackNavigator<BudgetParamList>();

const screenOptions = {
    headerShown: false
};

export const BudgetNavigationScreens = ({route}: RootNavigationProps<"Budget">) => {
    return (
        <Stack.Navigator initialRouteName={"BudgetHomeScreen"} screenOptions={screenOptions}>
            <Stack.Screen name={"BudgetHomeScreen"} initialParams={route.params} component={BudgetHomeScreen}/>
            <Stack.Screen name={"BudgetNewScreen"} initialParams={route.params} component={BudgetNewScreen}/>
            <Stack.Screen name={"BudgetEditScreen"} component={BudgetEditScreen}/>
            <Stack.Screen name={"BudgetDailyScreen"} initialParams={route.params} component={BudgetDailyScreen}/>
        </Stack.Navigator>
    )
}
