import {createStackNavigator} from "@react-navigation/stack";

import React from "react";
import {ModulesNavigationProps} from "../ModulesParamList";
import {ShoppingListParamList} from "./ShoppingListParamList";
import {ShoppingListHomePage} from "./Home";
import {ShoppingListCreateItemPage} from "./Create";
import {ShoppingListUpdatePage} from "./Update";

const Stack = createStackNavigator<ShoppingListParamList>();

const screenOptions = {
    headerShown: false
};

export const ShoppingListNavigationStack = ({}: ModulesNavigationProps<"ShoppingList">) => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={"HomePage"} component={ShoppingListHomePage}/>
            <Stack.Screen name={"CreateItemPage"} component={ShoppingListCreateItemPage} />
            <Stack.Screen name={"UpdateItemPage"} component={ShoppingListUpdatePage} />
        </Stack.Navigator>
    )
}
