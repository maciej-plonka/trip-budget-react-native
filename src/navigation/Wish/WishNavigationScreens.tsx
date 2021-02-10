import {createStackNavigator} from "@react-navigation/stack";

import React from "react";
import {WishParamList} from "./WishNavigationProps";
import {WishBuyScreen, WishDetailsScreen, WishEditScreen, WishHomeScreen, WishNewScreen} from "../../screens";
import {RootNavigationProps} from "../RootNavigationProps";

const Stack = createStackNavigator<WishParamList>();

const screenOptions = {
    headerShown: false
};

export const WishNavigationScreens = ({route}: RootNavigationProps<"Wish">) => {
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName={"WishHomeScreen"}>
            <Stack.Screen name={"WishHomeScreen"} initialParams={route.params} component={WishHomeScreen}/>
            <Stack.Screen name={"WishNewScreen"} component={WishNewScreen} />
            <Stack.Screen name={"WishEditScreen"} component={WishEditScreen} />
            <Stack.Screen name={"WishDetailsScreen"} component={WishDetailsScreen} />
            <Stack.Screen name={"WishBuyScreen"} component={WishBuyScreen} />
        </Stack.Navigator>
    )
}
