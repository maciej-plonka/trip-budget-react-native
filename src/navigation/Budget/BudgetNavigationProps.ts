import {StackNavigationProp} from "@react-navigation/stack";
import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {Id} from "../../store";
import {RootParamList} from "../RootNavigationProps";

export type BudgetParamList = {
    BudgetHomeScreen: { tripId: Id },
    BudgetNewScreen: { tripId: Id },
    BudgetEditScreen: { tripId: Id, id: Id },
    BudgetDailyScreen: {tripId: Id, dayTime?: number }
}

export type BudgetNavigation<T extends keyof BudgetParamList> = CompositeNavigationProp<StackNavigationProp<BudgetParamList, T>,
    StackNavigationProp<RootParamList, "Trip">>

export type BudgetNavigationProps<T extends keyof BudgetParamList> = {
    navigation: BudgetNavigation<T>
    route: RouteProp<BudgetParamList, T>
}
