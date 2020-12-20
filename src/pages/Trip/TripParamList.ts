import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type TripParamList = {
    HomePage: undefined
    CreateNewTripPage: undefined
}

export type TripNavigationProps<T extends keyof TripParamList> = {
    navigation: StackNavigationProp<TripParamList, T>
    route: RouteProp<TripParamList, T>
}
