import {InputProps} from "./InputProps";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {showToast} from "../../../models";
import React from "react";
import {Icons} from "../../../icons";
import {useMemoryImagePicker} from "./MemoryImagePicker";

type Props = InputProps<string | undefined> & {}

const height = 180

export const ImagePicker = ({value, onChanged}: Props) => {
    const {chooseImageFromMemory} = useMemoryImagePicker(onChanged, [2, 1])
    const handlePress = async () => {
        try {
            await chooseImageFromMemory()
        } catch (error) {
            showToast(error)
        }
    }
    return (
        <TouchableOpacity onLongPress={handlePress} style={{height}}>
            {value ? <Image style={styles.image} source={{uri: value}}/> : <EmptyImage/>}
        </TouchableOpacity>
    )
}


const EmptyImage = () => {
    return (
        <View style={styles.empty}>
            <Icons.Photo width={36} height={36} fill={"#8D8D8D"} />
        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        width: "100%",
        height: "100%",
    },
    empty: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)"
    }
})
