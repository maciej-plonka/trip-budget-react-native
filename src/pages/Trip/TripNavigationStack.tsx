import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "./Home";
import {TripParamList} from "./TripParamList"
import CreateNewTripPage from "./Create";

const Stack = createStackNavigator<TripParamList>();

const screenOptions = {
    headerShown: false
};

export default function TripNavigationStack() {
    return (
        <Stack.Navigator initialRouteName={"HomePage"} screenOptions={screenOptions}>
            <Stack.Screen name={"HomePage"} component={HomePage} />
            <Stack.Screen name={"CreateNewTripPage"} component={CreateNewTripPage}/>
        </Stack.Navigator>
    )
}
