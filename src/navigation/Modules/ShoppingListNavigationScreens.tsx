import {createStackNavigator} from "@react-navigation/stack";

import React from "react";
import {ModulesNavigationProps} from "./ModulesNavigationProps";
import {ShoppingListParamList} from "./ShoppingListNavigationProps";
import {ShoppingListCreateItemScreen, ShoppingListHomeScreen, ShoppingListUpdateItemScreen} from "../../screens";

const Stack = createStackNavigator<ShoppingListParamList>();

const screenOptions = {
    headerShown: false
};

export const ShoppingListNavigationScreens = ({}: ModulesNavigationProps<"ShoppingList">) => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={"HomeScreen"} component={ShoppingListHomeScreen}/>
            <Stack.Screen name={"CreateItemScreen"} component={ShoppingListCreateItemScreen} />
            <Stack.Screen name={"UpdateItemScreen"} component={ShoppingListUpdateItemScreen} />
        </Stack.Navigator>
    )
}
