import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ModulesParamList} from "./ModulesNavigationProps";
import {BottomTabIcon} from "./BottomTabIcon";
import {BudgetNavigationScreens} from "./BudgetNavigationScreens";
import {WishNavigationScreens} from "./WishNavigationScreens";
import {RootNavigationProps} from "../RootNavigationProps";

const Tab = createBottomTabNavigator<ModulesParamList>()

const tabBarOptions = {
    activeTintColor: "black",
    inactiveTintColor: "gray",
    keyboardHidesTabBar: true,
};

const screenOptions = {
    unmountOnBlur: true,
};

export const ModulesNavigationScreens = ({route}: RootNavigationProps<"Modules">) => {
    return (
        <Tab.Navigator initialRouteName={"Wish"} tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <Tab.Screen name={"Budget"}  options={{
                tabBarLabel: "Budget", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"budget"}/>)
            }} component={BudgetNavigationScreens}/>
            <Tab.Screen name={"Wish"} options={{
                tabBarLabel: "To buy", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"wish"}/>)
            }} component={WishNavigationScreens} />
        </Tab.Navigator>
    );
}
