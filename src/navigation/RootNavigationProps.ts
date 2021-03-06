import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Id} from "../store";

export type RootParamList = {
    Trip: undefined
    Budget: { tripId: Id }
    Wish: { tripId: Id }
}

type RootNavigation<T extends keyof RootParamList> = StackNavigationProp<RootParamList, T>

export type RootNavigationProps<T extends keyof RootParamList> = {
    navigation: RootNavigation<T>
    route: RouteProp<RootParamList, T>
}
