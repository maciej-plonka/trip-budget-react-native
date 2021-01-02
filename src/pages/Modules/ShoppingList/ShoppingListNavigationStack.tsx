import {createStackNavigator} from "@react-navigation/stack";

import React from "react";
import {ModulesNavigationProps} from "../ModulesParamList";
import {ShoppingListParamList} from "./ShoppingListParamList";
import {ShoppingListHomePage} from "./Home";

const Stack = createStackNavigator<ShoppingListParamList>();

const screenOptions = {
    headerShown: false
};

export const ShoppingListNavigationStack = ({route}: ModulesNavigationProps<"ShoppingList">) => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={"HomePage"} component={ShoppingListHomePage}/>
        </Stack.Navigator>
    )
}
