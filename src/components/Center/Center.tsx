import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
type Props = {
    children?: Array<JSX.Element | undefined> | JSX.Element,
    styles?: StyleProp<ViewStyle>
}
const Center = ({children, styles}:Props) => (
    <View style={[centerStyles.center, styles]}>
        {children}
    </View>
)

const centerStyles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }
});
export default Center;
