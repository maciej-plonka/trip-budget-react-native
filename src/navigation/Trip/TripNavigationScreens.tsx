import {createStackNavigator} from "@react-navigation/stack";
import {TripDetailsScreen, TripEditScreen, TripHomeScreen, TripNewScreen} from "../../screens";
import React from "react";
import {TripParamList} from "./TripNavigationProps";

const Stack = createStackNavigator<TripParamList>();

const screenOptions = {
    headerShown: false
};



export const TripNavigationScreens = () => {
    return (
        <Stack.Navigator initialRouteName={"TripHomeScreen"} screenOptions={screenOptions}>
            <Stack.Screen name={"TripHomeScreen"} component={TripHomeScreen}/>
            <Stack.Screen name={"TripDetailsScreen"} component={TripDetailsScreen}/>
            <Stack.Screen name={"TripNewScreen"} component={TripNewScreen}/>
            <Stack.Screen name={"TripEditScreen"} component={TripEditScreen}/>
        </Stack.Navigator>
    )
}
