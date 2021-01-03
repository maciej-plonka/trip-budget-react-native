import React from "react";
import Page from "../../../Page";
import {useThemeContext} from "../../../../contexts/ThemeContext";
import {ShoppingListNavigationProps} from "../ShoppingListParamList";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectAllShoppingItemsByTripId} from "../../../../store/selectors";
import {ItemCard} from "./ItemCard";


export const ShoppingListHomePage = ({navigation, route}: ShoppingListNavigationProps<"HomePage">) => {
    const tripId = route.params.tripId
    const shoppingItems = useSelector(selectAllShoppingItemsByTripId(tripId))
    const theme = useThemeContext()
    return (
        <Page title={"Shopping list"}
              fab={{
                  onPress: () => navigation.push("CreateItemPage", {tripId})
              }}
              headerColor={theme.colors.headers.shoppingList}>

            <View style={{padding: 16}}>
                <FlatList data={shoppingItems}
                          keyExtractor={it => it.id.toString()}
                          renderItem={({item}) => (
                              <TouchableOpacity style={styles.item}
                                                delayLongPress={200}
                                                onLongPress={() => navigation.push("UpdateItemPage", {tripId, itemId: item.id})}>
                                  <ItemCard item={item}/>
                              </TouchableOpacity>
                          )}/>
            </View>

        </Page>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 8,
    }
});
