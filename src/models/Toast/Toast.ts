import {ToastAndroid} from "react-native";

export function showToast(message: string) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        33
    );
}
