import {Card} from "../../../../components";
import React from "react";
import {StyleSheet} from "react-native";
import {ItemImage} from "./ItemImage";
import {ItemDescription} from "./ItemDescription";
import {ItemPrice} from "./ItemPrice";
import {ItemButton} from "./ItemButton";
import {Wish} from "../../../../store/models";

type Props = {
    item: Wish,
    onClick: () => void
}
export const ItemCard = ({item, onClick}:Props) => {
    return (
        <Card style={styles.progress} flat>
            <ItemImage item={item} />
            <ItemDescription item={item}/>
            <ItemPrice item={item} />
            <ItemButton item={item} onClick={onClick} />
        </Card>
    )
}

const styles = StyleSheet.create({
   progress: {
       borderRadius: 8,
       flexDirection: "row",
       height: 48,
   }
});
