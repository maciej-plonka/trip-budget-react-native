import {NavigatorScreenParams} from "@react-navigation/native";
import {ModulesParamList} from "./Modules/ModulesNavigationProps";
import {TripParamList} from "./Trip/TripNavigationProps";

export type RootParamList = {
    TripList: NavigatorScreenParams<TripParamList>
    Modules: NavigatorScreenParams<ModulesParamList>
}
