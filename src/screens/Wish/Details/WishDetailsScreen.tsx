import React, {useEffect} from "react";
import {WishNavigationProps} from "../../../navigation";
import {Screen} from "../../../components/Screen";
import {useThemeContext} from "../../../contexts/ThemeContext";
import {useSelector} from "react-redux";
import {selectWishById} from "../../../store/selectors";
import {View} from "react-native";
import {Center} from "../../../components/Center";
import {WishDetailsCard} from "./WishDetailsCard";

export const WishDetailsScreen = ({route, navigation}: WishNavigationProps<"WishDetailsScreen">) => {
    const color = useThemeContext().colors.headers.wish
    const wish = useSelector(selectWishById(route.params.itemId))
    useEffect(() => {
        !wish && navigation.navigate("WishHomeScreen", {...route.params })
    }, [wish])

    if(!wish) return (<View/>)

    return (
        <Screen>
            <Screen.Header title={"Wish details"} color={color} />
            <Screen.Content>
                <Center styles={{padding: 16}}>
                    <WishDetailsCard wish={wish} />
                </Center>
            </Screen.Content>
        </Screen>
    )

}
