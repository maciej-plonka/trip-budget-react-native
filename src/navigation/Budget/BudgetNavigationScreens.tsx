import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {BudgetExpenseDailyScreen, BudgetExpenseEditScreen, BudgetHomeScreen, BudgetExpenseNewScreen} from "../../screens";
import {BudgetParamList} from "./BudgetNavigationProps";
import {RootNavigationProps} from "../RootNavigationProps";
import {BudgetNewScreen} from "../../screens/Budget/New";

const Stack = createStackNavigator<BudgetParamList>();

const screenOptions = {
    headerShown: false
};

export const BudgetNavigationScreens = ({route}: RootNavigationProps<"Budget">) => {
    return (
        <Stack.Navigator initialRouteName={"BudgetHomeScreen"} screenOptions={screenOptions}>
            <Stack.Screen name={"BudgetNewScreen"}  component={BudgetNewScreen} />
            <Stack.Screen name={"BudgetHomeScreen"} initialParams={route.params} component={BudgetHomeScreen}/>
            <Stack.Screen name={"BudgetExpenseNewScreen"} component={BudgetExpenseNewScreen}/>
            <Stack.Screen name={"BudgetExpenseEditScreen"} component={BudgetExpenseEditScreen}/>
            <Stack.Screen name={"BudgetExpenseDailyScreen"}  component={BudgetExpenseDailyScreen}/>
        </Stack.Navigator>
    )
}
