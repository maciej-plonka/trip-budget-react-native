import React from "react";
import {Image, StyleSheet} from "react-native"

export const ItemImage = () => {
    return (
        <Image source={{uri:  "http://unsplash.it/48/48"}} style={styles.image} />
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
