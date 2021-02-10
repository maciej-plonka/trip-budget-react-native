import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {RootParamList} from "./RootNavigationProps";
import {TripNavigationScreens} from "./Trip";
import {BudgetNavigationScreens} from "./Budget";
import {WishNavigationScreens} from "./Wish";


const Stack = createStackNavigator<RootParamList>();

const screenOptions = {
    headerShown: false
};

export const RootNavigationScreens = () => {
    return (
        <Stack.Navigator initialRouteName={"Trip"} screenOptions={screenOptions}>
            <Stack.Screen name={"Trip"} component={TripNavigationScreens} />
            <Stack.Screen name={"Budget"} component={BudgetNavigationScreens} />
            <Stack.Screen name={"Wish"} component={WishNavigationScreens} />
        </Stack.Navigator>
    )
}
