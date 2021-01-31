import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {Id} from "../../store";

export type WishParamList = {
    WishHomeScreen: { tripId: Id },
    WishNewScreen: { tripId: Id },
    WishEditScreen: { itemId: Id, tripId: Id },
    WishDetailsScreen: {itemId: Id, tripId: Id}
    WishBuyScreen: {itemId: Id, tripId: Id}
}

export type WishNavigation<T extends keyof WishParamList> = StackNavigationProp<WishParamList, T>

export type WishNavigationProps<T extends keyof WishParamList> = {
    navigation: WishNavigation<T>
    route: RouteProp<WishParamList, T>
}
