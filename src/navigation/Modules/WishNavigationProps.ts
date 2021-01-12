import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type WishParamList = {
    WishHomeScreen: { tripId: number },
    WishNewScreen: { tripId: number },
    WishEditScreen: { itemId: number, tripId: number }
}

export type WishNavigation<T extends keyof WishParamList> = StackNavigationProp<WishParamList, T>

export type WishNavigationProps<T extends keyof WishParamList> = {
    navigation: WishNavigation<T>
    route: RouteProp<WishParamList, T>
}
