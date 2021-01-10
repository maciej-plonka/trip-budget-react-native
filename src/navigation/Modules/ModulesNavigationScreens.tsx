import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ModulesParamList} from "./ModulesNavigationProps";
import {BottomTabIcon} from "./BottomTabIcon";
import {BudgetNavigationScreens} from "./BudgetNavigationScreens";
import {ShoppingListNavigationScreens} from "./ShoppingListNavigationScreens";

const Tab = createBottomTabNavigator<ModulesParamList>()

const tabBarOptions = {
    activeTintColor: "black",
    inactiveTintColor: "gray",
    keyboardHidesTabBar: true,
};

const screenOptions = {
    unmountOnBlur: true,
};

export const ModulesNavigationScreens = () => {
    return (
        <Tab.Navigator initialRouteName={"ShoppingList"} tabBarOptions={tabBarOptions}   screenOptions={screenOptions}>
            <Tab.Screen name={"Budget"} options={{
                tabBarLabel: "Budget", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"budget"}/>)
            }} component={BudgetNavigationScreens}/>
            <Tab.Screen name={"ShoppingList"} options={{
                tabBarLabel: "To buy", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"shopping_list"}/>)
            }} component={ShoppingListNavigationScreens} />
        </Tab.Navigator>
    );
}
