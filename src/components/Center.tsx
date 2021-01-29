import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

type Props = {
    children?: React.ReactNode
    styles?: StyleProp<ViewStyle>
}
export const Center = ({children, styles}:Props) => (
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
