import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {
    BudgetCategoryEditScreen,
    BudgetEditScreen,
    BudgetExpenseDailyScreen,
    BudgetExpenseEditScreen,
    BudgetExpenseNewScreen,
    BudgetHomeScreen,
    BudgetNewScreen
} from "../../screens";
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
            <Stack.Screen name={"BudgetNewScreen"}  component={BudgetNewScreen} />
            <Stack.Screen name={"BudgetEditScreen"}  component={BudgetEditScreen} />
            <Stack.Screen name={"BudgetExpenseNewScreen"} component={BudgetExpenseNewScreen}/>
            <Stack.Screen name={"BudgetExpenseEditScreen"} component={BudgetExpenseEditScreen}/>
            <Stack.Screen name={"BudgetExpenseDailyScreen"}  component={BudgetExpenseDailyScreen}/>
            <Stack.Screen name={"BudgetCategoryEditScreen"} component={BudgetCategoryEditScreen} />
        </Stack.Navigator>
    )
}
