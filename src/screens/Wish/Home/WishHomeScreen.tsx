import React from "react";
import { WishNavigationProps} from "../../../navigation";
import {StyleSheet, View} from "react-native";
import {Card, FormCategoryPicker, Screen} from "../../../components";
import {useWishHome} from "./WishHomeHook";
import {WishHomeList} from "./WishHomeList";
import {useWishBottomDrawerNavigation} from "../WishBottomDrawerNavigation";

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
                <Card style={styles.categoryCard}>
                    <FormCategoryPicker
                        label={"Category"}
                        values={wishHome.categories}
                        value={wishHome.category}
                        onChanged={wishHome.selectCategory}
                        unselectedLabel={"All"}
                        iconDisabled/>
                </Card>

                <View style={styles.list}>
                    <WishHomeList wishes={wishHome.wishes}/>
                </View>
            </Screen.Content>
            <Screen.Fab onClick={navigateToCreateScreen} position={"center"}/>
            <Screen.BottomDrawer current={"wish"} onNavigate={bottomDrawerNavigation}/>
        </Screen>
    )
}

const styles = StyleSheet.create({
    categoryCard: {
        paddingVertical: 8,
        paddingHorizontal: 16
    },

    list: {
        paddingVertical: 8,
        paddingHorizontal: 16
    }
})
