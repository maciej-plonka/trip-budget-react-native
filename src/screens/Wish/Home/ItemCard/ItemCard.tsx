import {Card} from "../../../../components";
import React from "react";
import {Wish} from "../../../../store/states";
import {StyleSheet} from "react-native";
import {ItemImage} from "./ItemImage";
import {ItemDescription} from "./ItemDescription";
import {ItemPrice} from "./ItemPrice";
import {ItemButton} from "./ItemButton";

type Props = {
    item: Wish,
    onClick: () => void
}
export const ItemCard = ({item, onClick}:Props) => {
    return (
        <Card style={styles.card} flat>
            <ItemImage />
            <ItemDescription item={item}/>
            <ItemPrice item={item} />
            <ItemButton item={item} onClick={onClick} />
        </Card>
    )
}

const styles = StyleSheet.create({
   card: {
       borderRadius: 8,
       flexDirection: "row",
       height: 48,
   }
});
