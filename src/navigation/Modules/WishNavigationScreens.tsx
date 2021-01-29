import {createStackNavigator} from "@react-navigation/stack";

import React from "react";
import {ModulesNavigationProps} from "./ModulesNavigationProps";
import {WishParamList} from "./WishNavigationProps";
import {WishDetailsScreen, WishEditScreen, WishHomeScreen, WishNewScreen} from "../../screens";
import {WishBuyScreen} from "../../screens/Wish/Buy";

const Stack = createStackNavigator<WishParamList>();

const screenOptions = {
    headerShown: false
};

export const WishNavigationScreens = ({}: ModulesNavigationProps<"Wish">) => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={"WishHomeScreen"} component={WishHomeScreen}/>
            <Stack.Screen name={"WishNewScreen"} component={WishNewScreen} />
            <Stack.Screen name={"WishEditScreen"} component={WishEditScreen} />
            <Stack.Screen name={"WishDetailsScreen"} component={WishDetailsScreen} />
            <Stack.Screen name={"WishBuyScreen"} component={WishBuyScreen} />
        </Stack.Navigator>
    )
}
