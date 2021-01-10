import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type ShoppingListParamList = {
    HomeScreen: { tripId: number },
    CreateItemScreen: { tripId: number },
    UpdateItemScreen: { itemId: number, tripId: number }
}

export type ShoppingListNavigation<T extends keyof ShoppingListParamList> = StackNavigationProp<ShoppingListParamList, T>

export type ShoppingListNavigationProps<T extends keyof ShoppingListParamList> = {
    navigation: ShoppingListNavigation<T>
    route: RouteProp<ShoppingListParamList, T>
}
