import {Alert} from "react-native";

type Props = {
    title: string,
    description?: string,
    confirmText?: string,
    declineText?: string
}

export async function confirmMessageBox({title, description = "", confirmText = "Yes", declineText = "No"}: Props) {
    return new Promise<boolean>((resolve) => {
        Alert.alert(
            title,
            description,
            [
                {text: confirmText, onPress: () => resolve(true)},
                {text: declineText, onPress: () => resolve(false)}
            ]
        )
    });
}
