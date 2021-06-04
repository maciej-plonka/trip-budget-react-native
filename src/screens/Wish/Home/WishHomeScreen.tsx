import React from "react";
import {WishNavigationProps} from "../../../navigation";
import {FlatList} from "react-native";
import {Column, Screen, Space} from "../../../components";
import {useWishHome} from "./WishHomeHook";
import {useWishBottomDrawerNavigation} from "../WishBottomDrawerNavigation";
import {CategoryPicker} from "./CategoryPicker";
import {ItemCard} from "./ItemCard";
import {Wish} from "../../../store/models";

export const WishHomeScreen = ({navigation, route}: WishNavigationProps<"WishHomeScreen">) => {
    const tripId = route.params.tripId;
    const wishHome = useWishHome(tripId)
    const navigateToCreateScreen = () => navigation.push("WishNewScreen", {tripId})
    const navigateToEditScreen = (item: Wish) => navigation.push("WishEditScreen", {tripId, itemId: item.id})
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
                    <Space size={12} direction={"vertical"}/>
                    <FlatList data={wishHome.wishes} renderItem={({item}) => (
                        <ItemCard item={item} onClick={() => navigateToEditScreen(item)}/>
                    )}/>
                </Column>
            </Screen.Content>
            <Screen.Fab onClick={navigateToCreateScreen} position={"center"}/>
            <Screen.BottomDrawer current={"wish"} onNavigate={useWishBottomDrawerNavigation(navigation, tripId)}/>
        </Screen>
    )
}
