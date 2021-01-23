import React from "react";
import {useThemeContext} from "../../../contexts/ThemeContext";
import {WishNavigation, WishNavigationProps} from "../../../navigation";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {ItemCard} from "./ItemCard";
import {Wish} from "../../../store/states";
import {useNavigation} from "@react-navigation/native";
import {Screen} from "../../../components/Screen";
import {useWishHome} from "./WishHomeHook";

type Props = {
    item: Wish
}
export const FlatListItem = ({item}: Props) => {
    const navigation = useNavigation<WishNavigation<"WishHomeScreen">>()
    const navigateToEditScreen = () => {
        const navigationOptions = {tripId: item.tripId, itemId: item.id}
        navigation.push("WishEditScreen", navigationOptions)
    }
    return (
        <TouchableOpacity style={styles.item} delayLongPress={200} onLongPress={navigateToEditScreen}>
            <ItemCard item={item}/>
        </TouchableOpacity>
    )
}

export const WishHomeScreen = ({navigation, route}: WishNavigationProps<"WishHomeScreen">) => {
    const tripId = route.params.tripId;
    const color = useThemeContext().colors.headers.wish
    const wishHome = useWishHome(tripId)

    const navigateToCreateScreen = () =>  navigation.push("WishNewScreen", {tripId})

    return (
        <Screen>
            <Screen.Header title={"Wishes"} color={color} onTabChanged={wishHome.selectTab} >
                {wishHome.tabs.map((item, index) => (
                    <Screen.Header.Tab key={item.id} title={item.title} id={item.id} initial={index === 0}/>
                ))}
            </Screen.Header>
            <Screen.Content>
                <View style={{padding: 16}}>
                    <FlatList data={wishHome.wishes} keyExtractor={it => it.id.toString()}
                              renderItem={item => <FlatListItem {...item}/>}/>
                </View>
            </Screen.Content>
            <Screen.Fab onClick={navigateToCreateScreen}/>
        </Screen>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 8,
    }
});
