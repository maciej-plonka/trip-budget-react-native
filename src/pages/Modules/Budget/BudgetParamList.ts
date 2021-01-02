import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type BudgetParamList = {
    HomePage: { tripId: number }
}

export type BudgetNavigationProps <T extends keyof BudgetParamList> = {
    navigation: StackNavigationProp<BudgetParamList, T>
    route: RouteProp<BudgetParamList, T>
}
