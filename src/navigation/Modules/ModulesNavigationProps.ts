import {CompositeNavigationProp, NavigatorScreenParams, RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {StackNavigationProp} from "@react-navigation/stack";
import {BudgetParamList, RootParamList} from "../index";
import {WishParamList} from "./WishNavigationProps";

export type ModulesParamList = {
    Budget: NavigatorScreenParams<BudgetParamList>
    Wish: NavigatorScreenParams<WishParamList>
}

export type ModulesNavigationProps<T extends keyof ModulesParamList> = {
    navigation: CompositeNavigationProp<BottomTabNavigationProp<ModulesParamList, T>,
        StackNavigationProp<RootParamList, "Modules">>
    route: RouteProp<ModulesParamList, T>
}
