import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {BudgetHomeScreen, BudgetNewScreen} from "../../screens";
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
            <Stack.Screen name={"budgetNewScreen"} initialParams={route.params} component={BudgetNewScreen} />
        </Stack.Navigator>
    )
}
