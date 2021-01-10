import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {RootParamList} from "./RootNavigationProps";
import {TripNavigationScreens} from "./Trip";
import {ModulesNavigationScreens} from "./Modules";


const Stack = createStackNavigator<RootParamList>();

const screenOptions = {
    headerShown: false
};

export const RootNavigationScreens = () => {
    return (
        <Stack.Navigator initialRouteName={"TripList"} screenOptions={screenOptions}>
            <Stack.Screen name={"TripList"} component={TripNavigationScreens} />
            <Stack.Screen name={"Modules"} component={ModulesNavigationScreens} />
        </Stack.Navigator>
    )
}
