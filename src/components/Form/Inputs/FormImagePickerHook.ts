import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';

type FormImagePicker = {
    chooseImageFromMemory(): Promise<void>,
}

const imagePickerOptions = (aspect: [number, number]) =>  ({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect,
    quality: 1,
});

type Result = {uri: string}
export const useFormImagePicker = (current: string | undefined, onChanged: (value: string | undefined) => void, aspectRatio: [number, number]): FormImagePicker => {
    const [image, setImage] = useState<string | undefined>(current)
    useEffect(() => {
        onChanged(image)
    }, [image])

    const chooseImageFromMemory = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!granted) {
            throw new Error("Permission to access storage not granted")
        }

        const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions(aspectRatio)) as Result;
        setImage(result.uri)
    }
    return {chooseImageFromMemory}
}
