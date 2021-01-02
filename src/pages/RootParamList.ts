import {NavigatorScreenParams} from "@react-navigation/native";
import {ModulesParamList} from "./Modules/ModulesParamList";
import {TripParamList} from "./Trip/TripParamList";

export type RootParamList = {
    TripList: NavigatorScreenParams<TripParamList>
    Modules: NavigatorScreenParams<ModulesParamList>
}
