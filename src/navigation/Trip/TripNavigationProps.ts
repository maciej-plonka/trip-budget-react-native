import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootParamList} from "../RootNavigationProps";

export type TripParamList = {
    HomeScreen: undefined
    CreateNewTripScreen: undefined,
    TripDetailsScreen: {tripId: number }
    UpdateTripScreen: { tripId: number },
    UpdateTripBudgetScreen: { tripId: number },
}

export type TripNavigationProps<T extends keyof TripParamList> = {
    navigation: CompositeNavigationProp<
        StackNavigationProp<TripParamList, T> ,
        StackNavigationProp<RootParamList, "TripList">
        >
    route: RouteProp<TripParamList, T>
}
