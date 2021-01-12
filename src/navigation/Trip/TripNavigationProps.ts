import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootParamList} from "../RootNavigationProps";
import {WishParamList} from "../Modules";

export type TripParamList = {
    TripHomeScreen: undefined
    TripNewScreen: undefined,
    TripDetailsScreen: { tripId: number }
    TripEditScreen: { tripId: number },
    TripBudgetEditScreen: { tripId: number },
}

export type TripNavigation<T extends keyof TripParamList> = CompositeNavigationProp<StackNavigationProp<TripParamList, T>,
    StackNavigationProp<RootParamList, "TripList">>

export type TripNavigationProps<T extends keyof TripParamList> = {
    navigation: TripNavigation<T>
    route: RouteProp<TripParamList, T>
}
