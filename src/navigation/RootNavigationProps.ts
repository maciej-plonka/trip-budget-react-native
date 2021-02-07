import {NavigatorScreenParams, RouteProp} from "@react-navigation/native";
import {ModulesParamList, WishParamList} from "./Modules";
import {TripParamList} from "./Trip";
import {StackNavigationProp} from "@react-navigation/stack";

export type RootParamList = {
    TripList: NavigatorScreenParams<TripParamList>
    Modules: NavigatorScreenParams<ModulesParamList>
}

export type RootNavigation<T extends keyof RootParamList> = StackNavigationProp<RootParamList, T>

export type RootNavigationProps<T extends keyof RootParamList> = {
    navigation: RootNavigation<T>
    route: RouteProp<RootParamList, T>
}
