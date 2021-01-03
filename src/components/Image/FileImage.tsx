import React, {useEffect, useState} from "react";
import {getAssetInfoAsync, requestPermissionsAsync} from "expo-media-library";
import {Image, StyleProp, View, ViewStyle} from "react-native";

type Props = {
    imageId: string,
    style?: StyleProp<ViewStyle>
}
export const FileImage = ({imageId}:Props) => {
    const [imageUri, setImageUri] = useState<string | undefined>()

    useEffect(() => {
        const loadImage = async () => {
            const {granted} = await requestPermissionsAsync()
            if(!granted) return;
            try {
                const asset = await getAssetInfoAsync(imageId)
                asset && setImageUri(asset.localUri)
            }catch(error) {
                console.error(error)
            }
        }
        imageId && loadImage();
    }, [imageId] );
    useEffect(() => {
        console.log(`imageUri ${imageUri}`)
    },[imageUri])
    if(!imageUri) {
        return <View/>
    }
    return <Image source={{uri: imageUri}} />
}
