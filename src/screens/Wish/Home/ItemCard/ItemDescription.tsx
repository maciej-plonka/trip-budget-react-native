import {Wish} from "../../../../store/states";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {selectBudgetCategoryById} from "../../../../store/selectors";

type Props = {
    item: Wish
}
export const ItemDescription = ({item}: Props) => {
    const category = item.budgetCategoryId ? useSelector(selectBudgetCategoryById(item.budgetCategoryId)) : null
    return (
        <View style={styles.root}>
            {category
                ? (<Text style={styles.category}>{category.name}</Text>)
                : (<View/>)
            }
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
