import React from "react";
import {Wish} from "../../../../store/states";
import {FlatList, StyleSheet, View} from "react-native";
import {HasId} from "../../../../store";
import {WishHomeListItem} from "./WishHomeListItem";

const keyExtractor = (it: HasId) => it.id.toString();
const renderItem = ({item}: { item: Wish }) => (
    <View style={styles.item}>
        <WishHomeListItem wish={item}/>
    </View>
)

type Props = {
    wishes: Readonly<Wish[]>
}

export const WishHomeList = ({wishes}: Props) => (
    <FlatList data={wishes} keyExtractor={keyExtractor} renderItem={renderItem}/>
)


const styles = StyleSheet.create({
    item: {
        marginVertical: 4,
    }
});
