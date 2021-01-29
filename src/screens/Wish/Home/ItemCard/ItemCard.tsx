import {Card} from "../../../../components";
import React from "react";
import {Wish} from "../../../../store/states";
import {StyleSheet} from "react-native";
import {ItemImage} from "./ItemImage";
import {ItemDescription} from "./ItemDescription";
import {ItemPrice} from "./ItemPrice";
import {ItemExpenseIndicator} from "./ItemExpenseIndicator";

type Props = {
    item: Wish
}
export const ItemCard = ({item}:Props) => {
    return (
        <Card style={styles.card} flat>
            <ItemImage />
            <ItemDescription item={item}/>
            <ItemPrice item={item} />
            <ItemExpenseIndicator item={item} />
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
