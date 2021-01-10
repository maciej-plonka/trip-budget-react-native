import {createStackNavigator} from "@react-navigation/stack";
import {CreateNewTripScreen, TripDetailsScreen, TripHomeScreen, UpdateTripBudgetScreen, UpdateTripScreen} from "../../screens";
import React from "react";
import {TripParamList} from "./TripNavigationProps";

const Stack = createStackNavigator<TripParamList>();

const screenOptions = {
    headerShown: false
};



export const TripNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={"HomeScreen"} screenOptions={screenOptions}>
            <Stack.Screen name={"HomeScreen"} component={TripHomeScreen}/>
            <Stack.Screen name={"TripDetailsScreen"} component={TripDetailsScreen}/>
            <Stack.Screen name={"CreateNewTripScreen"} component={CreateNewTripScreen}/>
            <Stack.Screen name={"UpdateTripScreen"} component={UpdateTripScreen}/>
            <Stack.Screen name={"UpdateTripBudgetScreen"} component={UpdateTripBudgetScreen}/>
        </Stack.Navigator>
    )
}
