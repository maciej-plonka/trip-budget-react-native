import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {showToast} from "../../../models/Toast";
import {useMemoryImagePicker} from "./MemoryImagePicker";
import {Icon} from "../../Icon";
import {Styled} from "../../Blocks";
import {InputProps} from "./InputProps";

type Props = InputProps<string | undefined> & Styled & {
    imageRatio?: [number, number]
}

const EmptyImage = () => {
    return (
        <View style={styles.emptyImage}>
            <Icon iconType={"plus"} size={64} color={"gray"} />
        </View>
    )
}

export const FormImagePicker = ({value, onChanged,imageRatio = [1,1]}: Props) => {
    const [image, setImage] = useState<string | undefined>(value)
    useEffect(() => {
        onChanged(image)
    }, [image])
    const {chooseImageFromMemory} = useMemoryImagePicker(setImage, imageRatio)
     const handlePress = async () => {
        try {
            await chooseImageFromMemory()
        }catch(e) {
            showToast(`Error: ${e}`)
        }
    }
    return (
        <TouchableOpacity delayLongPress={200} onLongPress={handlePress} style={styles.root}>
            {value ? (<Image style={styles.image} source={{uri:value}} />) : (<EmptyImage />)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        elevation: 1,
    },
    image: {
        width: "100%",
        height: "100%"
    },
    emptyImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
        borderRadius: 96,
        borderWidth:1,
        borderColor: "rgba(0,0,0,0.1)"
    }

})
