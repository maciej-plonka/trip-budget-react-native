import {ImageStyle, StyleProp, ViewStyle} from "react-native";

export type Styled<Style extends ViewStyle | ImageStyle = ViewStyle> = {
    style?: StyleProp<Style>
}
