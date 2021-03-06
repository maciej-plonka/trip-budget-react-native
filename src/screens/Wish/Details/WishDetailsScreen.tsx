import React, {useEffect} from "react";
import {WishNavigationProps} from "../../../navigation";
import {Center, Screen} from "../../../components";
import {useSelector} from "react-redux";
import {selectWishById} from "../../../store/selectors";
import {View} from "react-native";
import {WishDetailsCard} from "./Card";
import {useWishBottomDrawerNavigation} from "../WishBottomDrawerNavigation";

export const WishDetailsScreen = ({route, navigation}: WishNavigationProps<"WishDetailsScreen">) => {
    const wish = useSelector(selectWishById(route.params.itemId))
    const bottomNavigation = useWishBottomDrawerNavigation(navigation, route.params.tripId);
    useEffect(() => {
        !wish && navigation.navigate("WishHomeScreen", {...route.params })
    }, [wish])

    if(!wish) return (<View/>)

    return (
        <Screen>
            <Screen.Header title={"Wish details"} color={"wish"} />
            <Screen.Content>
                <Center style={{padding: 16}}>
                    <WishDetailsCard wish={wish} />
                </Center>
            </Screen.Content>
            <Screen.BottomDrawer current={"wish"} onNavigate={bottomNavigation} />
        </Screen>
    )

}
