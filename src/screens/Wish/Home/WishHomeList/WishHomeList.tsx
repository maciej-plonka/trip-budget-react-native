import React from "react";
import {Wish} from "../../../../store/states";
import {FlatList} from "react-native";
import {HasId} from "../../../../store";
import {WishHomeListItem} from "./WishHomeListItem";

const keyExtractor = (it: HasId) => it.id.toString();
const renderItem = ({item}: { item: Wish }) => <WishHomeListItem wish={item}/>

type Props = {
    wishes: Readonly<Wish[]>
}

export const WishHomeList = ({wishes}: Props) => (
    <FlatList data={wishes} keyExtractor={keyExtractor} renderItem={renderItem}/>
)

