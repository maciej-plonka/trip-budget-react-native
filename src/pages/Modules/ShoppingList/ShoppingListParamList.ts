import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type ShoppingListParamList = {
    HomePage: { tripId: number },
    CreateItemPage: { tripId: number },
    UpdateItemPage: { itemId: number, tripId: number }
}

export type  ShoppingListNavigation<T extends keyof ShoppingListParamList> = StackNavigationProp<ShoppingListParamList, T>

export type ShoppingListNavigationProps<T extends keyof ShoppingListParamList> = {
    navigation: ShoppingListNavigation<T>
    route: RouteProp<ShoppingListParamList, T>
}
