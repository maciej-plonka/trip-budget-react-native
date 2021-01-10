import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {RootParamList} from "./RootNavigationProps";
import {TripNavigation} from "./Trip";
import {ModulesNavigation} from "./Modules";


const Stack = createStackNavigator<RootParamList>();

const screenOptions = {
    headerShown: false
};

export const RootNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={"TripList"} screenOptions={screenOptions}>
            <Stack.Screen name={"TripList"} component={TripNavigation} />
            <Stack.Screen name={"Modules"} component={ModulesNavigation} />
        </Stack.Navigator>
    )
}
