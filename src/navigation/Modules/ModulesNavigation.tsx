import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ModulesParamList} from "./ModulesNavigationProps";
import {BottomTabIcon} from "./BottomTabIcon";
import {BudgetNavigation} from "./BudgetNavigation";
import {ShoppingListNavigation} from "./ShoppingListNavigation";

const Tab = createBottomTabNavigator<ModulesParamList>()

const tabBarOptions = {
    activeTintColor: "black",
    inactiveTintColor: "gray",
    keyboardHidesTabBar: true,
};

const screenOptions = {
    unmountOnBlur: true,
};

export const ModulesNavigation = () => {
    return (
        <Tab.Navigator initialRouteName={"ShoppingList"} tabBarOptions={tabBarOptions}   screenOptions={screenOptions}>
            <Tab.Screen name={"Budget"} options={{
                tabBarLabel: "Budget", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"budget"}/>)
            }} component={BudgetNavigation}/>
            <Tab.Screen name={"ShoppingList"} options={{
                tabBarLabel: "To buy", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"shopping_list"}/>)
            }} component={ShoppingListNavigation} />
        </Tab.Navigator>
    );
}
