import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {selectBudgetCategoryByWishId} from "../../../../store/selectors";
import {Wish} from "../../../../store/models";


function useItemDescription(item: Wish) {
    const category = useSelector(selectBudgetCategoryByWishId(item.id));
    return {
        categoryName: category?.name ?? "Essentials"
    }
}

type Props = {
    item: Wish
}
export const ItemDescription = ({item}: Props) => {
    const {categoryName} = useItemDescription(item);
    return (
        <View style={styles.root}>
            <Text style={styles.category}>{categoryName}</Text>
            <Text style={styles.name}>{item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        padding: 4,
    },
    category: {
        fontSize: 14,
    },
    name: {
        fontSize: 12,
        color: "gray",
    }
});
