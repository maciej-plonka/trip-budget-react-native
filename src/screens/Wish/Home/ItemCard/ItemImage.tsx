import React from "react";
import {Image, StyleSheet} from "react-native"
import {Wish} from "../../../../store/models";

type Props = {
    item: Wish
}
export const ItemImage = ({item}:Props) => {
    return (
        <Image source={{uri:  item.image, width: 48, height: 48}} style={styles.image} />
    )
}


const styles = StyleSheet.create({
    image: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        width: 48,
        height: 48,
        resizeMode: "cover",
    }
});
