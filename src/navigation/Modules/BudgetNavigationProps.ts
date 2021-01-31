import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {Id} from "../../store";

export type BudgetParamList = {
    BudgetHomeScreen: { tripId: Id }
}

export type BudgetNavigationProps <T extends keyof BudgetParamList> = {
    navigation: StackNavigationProp<BudgetParamList, T>
    route: RouteProp<BudgetParamList, T>
}
