import {NavigatorScreenParams} from "@react-navigation/native";
import {ModulesParamList} from "./Modules";
import {TripParamList} from "./Trip";

export type RootParamList = {
    TripList: NavigatorScreenParams<TripParamList>
    Modules: NavigatorScreenParams<ModulesParamList>
}
