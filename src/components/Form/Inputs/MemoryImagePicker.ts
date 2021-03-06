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
export const useMemoryImagePicker = (onChanged: (value: string | undefined) => void, aspectRatio: [number, number]): FormImagePicker => {
    const chooseImageFromMemory = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!granted) {
            throw new Error("Permission to access storage not granted")
        }

        const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions(aspectRatio)) as Result;
        onChanged(result.uri)
    }
    return {chooseImageFromMemory}
}
