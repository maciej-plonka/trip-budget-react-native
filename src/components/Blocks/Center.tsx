import React from "react";
import {StyleSheet, View} from "react-native";
import {BlockProps, useBlockStyles} from "./Block";

export const Center = ({children, ...props}: BlockProps) => {
    const blockStyles = useBlockStyles(props)
    return (
        <View style={[styles.center, ...blockStyles]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }
});
