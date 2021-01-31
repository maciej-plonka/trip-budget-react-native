import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootParamList} from "../RootNavigationProps";
import {Id} from "../../store";

export type TripParamList = {
    TripHomeScreen: undefined
    TripNewScreen: undefined,
    TripDetailsScreen: { tripId: Id }
    TripEditScreen: { tripId: Id },
    TripBudgetEditScreen: { tripId: Id },
}

export type TripNavigation<T extends keyof TripParamList> = CompositeNavigationProp<StackNavigationProp<TripParamList, T>,
    StackNavigationProp<RootParamList, "TripList">>

export type TripNavigationProps<T extends keyof TripParamList> = {
    navigation: TripNavigation<T>
    route: RouteProp<TripParamList, T>
}
