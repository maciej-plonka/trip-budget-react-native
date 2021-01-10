import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootParamList} from "../RootNavigationProps";
import {ShoppingListParamList} from "../Modules";

export type TripParamList = {
    HomeScreen: undefined
    CreateNewTripScreen: undefined,
    TripDetailsScreen: { tripId: number }
    UpdateTripScreen: { tripId: number },
    UpdateTripBudgetScreen: { tripId: number },
}

export type TripNavigation<T extends keyof TripParamList> = CompositeNavigationProp<StackNavigationProp<TripParamList, T>,
    StackNavigationProp<RootParamList, "TripList">>

export type TripNavigationProps<T extends keyof TripParamList> = {
    navigation: TripNavigation<T>
    route: RouteProp<TripParamList, T>
}
