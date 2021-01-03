import {StackNavigationProp} from "@react-navigation/stack";
import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {RootParamList} from "../RootParamList";

export type TripParamList = {
    HomePage: undefined
    CreateNewTripPage: undefined,
    TripDetailsPage: {tripId: number }
    UpdateTripPage: { tripId: number },
    UpdateTripBudgetPage: { tripId: number },
}

export type TripNavigationProps<T extends keyof TripParamList> = {
    navigation: CompositeNavigationProp<
        StackNavigationProp<TripParamList, T> ,
        StackNavigationProp<RootParamList, "TripList">
    >
    route: RouteProp<TripParamList, T>
}
