import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type ShoppingListParamList = {
    HomePage: { tripId: number }
}

export type ShoppingListNavigationProps <T extends keyof ShoppingListParamList> = {
    navigation: StackNavigationProp<ShoppingListParamList, T>
    route: RouteProp<ShoppingListParamList, T>
}
