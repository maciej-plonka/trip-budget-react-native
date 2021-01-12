import {createStackNavigator} from "@react-navigation/stack";
import {ModulesNavigationProps} from "./ModulesNavigationProps";
import React from "react";
import {BudgetHomeScreen} from "../../screens";
import {BudgetParamList} from "./BudgetNavigationProps";

const Stack = createStackNavigator<BudgetParamList>();

const screenOptions = {
    headerShown: false
};

export const BudgetNavigationScreens = ({route}: ModulesNavigationProps<"Budget">) => {
    return (
        <Stack.Navigator initialRouteName={"BudgetHomeScreen"} screenOptions={screenOptions}>
            <Stack.Screen name={"BudgetHomeScreen"} component={BudgetHomeScreen}/>
        </Stack.Navigator>
    )
}
