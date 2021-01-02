import {CompositeNavigationProp, NavigatorScreenParams, RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootParamList} from "../RootParamList";
import {BudgetParamList} from "./Budget";
import {ShoppingListParamList} from "./ShoppingList";

export type ModulesParamList = {
    Budget: NavigatorScreenParams<BudgetParamList>
    ShoppingList: NavigatorScreenParams<ShoppingListParamList>
}

export type ModulesNavigationProps<T extends keyof ModulesParamList> = {
    navigation: CompositeNavigationProp<BottomTabNavigationProp<ModulesParamList, T>,
        StackNavigationProp<RootParamList, "Modules">>
    route: RouteProp<ModulesParamList, T>
}
