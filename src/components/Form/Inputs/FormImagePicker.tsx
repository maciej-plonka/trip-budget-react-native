import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";
import React from "react";
import {showToast} from "../../../models/Toast";
import {FileImage} from "../../Image/FileImage";
import {launchImageLibraryAsync} from "expo-image-picker";
import {
    addAssetsToAlbumAsync,
    createAlbumAsync,
    createAssetAsync,
    getAlbumAsync,
    removeAssetsFromAlbumAsync,
    requestPermissionsAsync
} from "expo-media-library";

type Props = BaseInputProps<string | undefined> & {
    style?: StyleProp<ViewStyle>
}
export const FormImagePicker = ({value, onChanged}: Props) => {
    const updateImageId = async (newImageId: string | undefined) => {
        const album = await getAlbumAsync("Trip planner");
        if (value && album) {
            console.log(`deleting asset from album: ${value}`)
            try {
                const removed = await removeAssetsFromAlbumAsync([value], album)
                console.log(`assets removed? ${removed}`)
            }catch(error) {
                console.error(error)
            }
        }
        onChanged(newImageId);
    }


    const handlePress = async () => {

        const {granted} = await requestPermissionsAsync()
        if (!granted) return;
        const selectedImage = await launchImageLibraryAsync() as { uri: string }
        if (!selectedImage) {
            showToast("Couldn't load image");
            await updateImageId(undefined);
            return;
        }
        const image = await createAssetAsync(selectedImage.uri)
        if (!image) {
            showToast("Couldn't save image");
            await updateImageId(undefined)
            return;
        }
        const album = await getAlbumAsync("Trip planner");
        if (album) {
            await addAssetsToAlbumAsync(image, album, false);
        } else {
            await createAlbumAsync("Trip planner", image, false);
        }
        await updateImageId(image.id);
    }
    return (
        <TouchableOpacity delayLongPress={200} onLongPress={handlePress} style={styles.root}>
            {value ? (<FileImage style={styles.image} imageId={value}/>) : (<View/>)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "red"
    },
    image: {
        width: "100%",
        height: "100%"
    }

})
