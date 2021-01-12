import React from "react";
import {Screen} from "../../Screen";
import {useThemeContext} from "../../../contexts/ThemeContext";
import {WishNavigation, WishNavigationProps} from "../../../navigation";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {ItemCard} from "./ItemCard";
import {useWishesByTripId} from "./WishHook";
import {Wish} from "../../../store/states";
import {useNavigation} from "@react-navigation/native";

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
    const wishes = useWishesByTripId(tripId)
    const theme = useThemeContext()
    const navigateToCreateScreen = () => {
        navigation.push("WishNewScreen", {tripId})
    }
    return (
        <Screen title={"Wishes"}
                fab={{onPress: navigateToCreateScreen}}
                headerColor={theme.colors.headers.wish}>
            <View style={{padding: 16}}>
                <FlatList data={wishes} keyExtractor={it => it.id.toString()}
                          renderItem={item => <FlatListItem {...item}/>}/>
            </View>

        </Screen>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 8,
    }
});
