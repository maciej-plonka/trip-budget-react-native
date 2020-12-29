import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type TripParamList = {
    HomePage: undefined
    CreateNewTripPage: undefined,
    TripDetailsPage: {tripId: number }
    UpdateTripPage: { tripId: number },
    UpdateTripBudgetPage: { tripId: number },
}

export type TripNavigationProps<T extends keyof TripParamList> = {
    navigation: StackNavigationProp<TripParamList, T>
    route: RouteProp<TripParamList, T>
}
