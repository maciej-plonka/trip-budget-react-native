import React from "react";
import {Screen} from "../../Screen";
import {useThemeContext} from "../../../contexts/ThemeContext";
import {ShoppingListNavigation, ShoppingListNavigationProps} from "../../../navigation";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {ItemCard} from "./ItemCard";
import {useShoppingListItems} from "./ShoppingListItemsHook";
import {ShoppingListItem} from "../../../store/states";
import {useNavigation} from "@react-navigation/native";

type Props = {
    item: ShoppingListItem
}
export const FlatListItem = ({item}: Props) => {
    const navigation = useNavigation<ShoppingListNavigation<"HomeScreen">>()
    const navigateToUpdateScreen = () => {
        const navigationOptions = {tripId: item.tripId, itemId: item.id}
        navigation.push("UpdateItemScreen", navigationOptions)
    }
    return (
        <TouchableOpacity style={styles.item} delayLongPress={200} onLongPress={navigateToUpdateScreen}>
            <ItemCard item={item}/>
        </TouchableOpacity>
    )
}

export const ShoppingListHomeScreen = ({navigation, route}: ShoppingListNavigationProps<"HomeScreen">) => {
    const tripId = route.params.tripId;
    const shoppingItems = useShoppingListItems(tripId)
    const theme = useThemeContext()
    const navigateToCreateScreen = () => {
        navigation.push("CreateItemScreen", {tripId})
    }
    return (
        <Screen title={"Shopping list"}
                fab={{onPress: navigateToCreateScreen}}
                headerColor={theme.colors.headers.shoppingList}>
            <View style={{padding: 16}}>
                <FlatList data={shoppingItems} keyExtractor={it => it.id.toString()}
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
