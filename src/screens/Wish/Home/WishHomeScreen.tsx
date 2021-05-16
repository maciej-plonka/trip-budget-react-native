import React from "react";
import {WishNavigationProps} from "../../../navigation";
import {ScrollView, StyleSheet, View} from "react-native";
import {Card, Column, FormCategorySelect, Screen} from "../../../components";
import {useWishHome} from "./WishHomeHook";
import {WishHomeList} from "./WishHomeList";
import {useWishBottomDrawerNavigation} from "../WishBottomDrawerNavigation";
import {CategoryPicker} from "./CategoryPicker";

export const WishHomeScreen = ({navigation, route}: WishNavigationProps<"WishHomeScreen">) => {
    const tripId = route.params.tripId;
    const bottomDrawerNavigation = useWishBottomDrawerNavigation(navigation, tripId);
    const wishHome = useWishHome(tripId)
    const navigateToCreateScreen = () => navigation.push("WishNewScreen", {tripId})
    return (
        <Screen>
            <Screen.Header title={"Wishes"} color={"wish"} onTabChanged={wishHome.selectTab}>
                {wishHome.tabs.map((item, index) => (
                    <Screen.Header.Tab key={item.id} title={item.title} id={item.id} initial={index === 0}/>
                ))}
            </Screen.Header>
            <Screen.Content>
                <Column padding={16}>
                    <CategoryPicker
                        tripId={tripId}
                        onCategoryChanged={wishHome.selectCategory}
                    />
                    <WishHomeList wishes={wishHome.wishes}/>
                </Column>
            </Screen.Content>
            <Screen.Fab onClick={navigateToCreateScreen} position={"center"}/>
            <Screen.BottomDrawer current={"wish"} onNavigate={bottomDrawerNavigation}/>
        </Screen>
    )
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 8,
        paddingHorizontal: 16
    }
})
