import React from "react";
import Page from "../../../Page";
import {useThemeContext} from "../../../../contexts/ThemeContext";
import {ShoppingListNavigation, ShoppingListNavigationProps} from "../ShoppingListParamList";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {ItemCard} from "./ItemCard";
import {useShoppingListItems} from "./ShoppingListItemsHook";
import {ShoppingListItem} from "../../../../store/states";
import {useNavigation} from "@react-navigation/native";

type Props = {
    item: ShoppingListItem
}
export const FlatListItem = ({item}: Props) => {
    const navigation = useNavigation<ShoppingListNavigation<"HomePage">>()
    const navigateToUpdatePage = () => {
        const navigationOptions = {tripId: item.tripId, itemId: item.id}
        navigation.push("UpdateItemPage", navigationOptions)
    }
    return (
        <TouchableOpacity style={styles.item} delayLongPress={200} onLongPress={navigateToUpdatePage}>
            <ItemCard item={item}/>
        </TouchableOpacity>
    )
}

export const ShoppingListHomePage = ({navigation, route}: ShoppingListNavigationProps<"HomePage">) => {
    const tripId = route.params.tripId;
    const shoppingItems = useShoppingListItems(tripId)
    const theme = useThemeContext()
    const navigateToCreatePage = () => {
        navigation.push("CreateItemPage", {tripId})
    }
    return (
        <Page title={"Shopping list"}
              fab={{onPress: navigateToCreatePage}}
              headerColor={theme.colors.headers.shoppingList}>
            <View style={{padding: 16}}>
                <FlatList data={shoppingItems} keyExtractor={it => it.id.toString()}
                          renderItem={item => <FlatListItem {...item}/>}/>
            </View>

        </Page>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 8,
    }
});
