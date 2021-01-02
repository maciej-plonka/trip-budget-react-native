import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ModulesParamList} from "./ModulesParamList";
import {BottomTabIcon} from "./BottomTabIcon";
import {ShoppingListNavigationStack} from "./ShoppingList";
import {BudgetNavigationStack} from "./Budget";

const Tab = createBottomTabNavigator<ModulesParamList>()

const tabBarOptions = {
    activeTintColor: "black",
    inactiveTintColor: "gray",
    keyboardHidesTabBar: true,
};

const screenOptions = {
    unmountOnBlur: true,
};

export const ModulesBottomTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={"ShoppingList"} tabBarOptions={tabBarOptions}   screenOptions={screenOptions}>
            <Tab.Screen name={"Budget"} options={{
                tabBarLabel: "Budget", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"budget"}/>)
            }} component={BudgetNavigationStack}/>
            <Tab.Screen name={"ShoppingList"} options={{
                tabBarLabel: "To buy", tabBarIcon: (props) => (<BottomTabIcon {...props} icon={"shopping_list"}/>)
            }} component={ShoppingListNavigationStack} />
        </Tab.Navigator>
    );
}
