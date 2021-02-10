import {StackNavigationProp} from "@react-navigation/stack";
import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {Id} from "../../store";
import {WishParamList} from "../Wish";
import {RootParamList} from "../RootNavigationProps";
import {TripParamList} from "../Trip";

export type BudgetParamList = {
    BudgetHomeScreen: { tripId: Id }
}

export type BudgetNavigation<T extends keyof BudgetParamList> = CompositeNavigationProp<StackNavigationProp<BudgetParamList, T>,
    StackNavigationProp<RootParamList, "Trip">>

export type BudgetNavigationProps <T extends keyof BudgetParamList> = {
    navigation: BudgetNavigation< T>
    route: RouteProp<BudgetParamList, T>
}
