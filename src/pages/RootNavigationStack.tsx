import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import TripNavigationStack from "./Trip";
import {ModulesBottomTabNavigator} from "./Modules";
import {RootParamList} from "./RootParamList";



const Stack = createStackNavigator<RootParamList>();

const screenOptions = {
    headerShown: false
};

export const RootNavigationStack = () => {
    return (
        <Stack.Navigator initialRouteName={"TripList"} screenOptions={screenOptions}>
            <Stack.Screen name={"TripList"} component={TripNavigationStack} />
            <Stack.Screen name={"Modules"} component={ModulesBottomTabNavigator} />
        </Stack.Navigator>
    )
}
