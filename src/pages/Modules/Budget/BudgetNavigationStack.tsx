import {createStackNavigator} from "@react-navigation/stack";
import {ModulesNavigationProps} from "../ModulesParamList";
import React from "react";
import {BudgetHomePage} from "./Home";
import {BudgetParamList} from "./BudgetParamList";

const Stack = createStackNavigator<BudgetParamList>();

const screenOptions = {
    headerShown: false
};

export const BudgetNavigationStack = ({route}: ModulesNavigationProps<"Budget">) => {
    return (
        <Stack.Navigator initialRouteName={"HomePage"} screenOptions={screenOptions}>
            <Stack.Screen name={"HomePage"} component={BudgetHomePage}/>
        </Stack.Navigator>
    )
}
