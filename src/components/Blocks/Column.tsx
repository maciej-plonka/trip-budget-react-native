import React from "react";
import {StyleSheet, View} from "react-native";
import {BlockProps, useBlockStyles} from "./Block";

export const Column = ({children,...props}:BlockProps) => {
    const blockStyles = useBlockStyles(props)
    return (
        <View style={[styles.column, ...blockStyles]} {...props}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    column: {
        flexDirection: "column"
    }
})
