import {StyleSheet, View} from "react-native";
import React from "react";
import {BlockProps, useBlockStyles} from "./Block";

export const Row = ({children, ...props}: BlockProps) => {
    const blockStyles = useBlockStyles(props);
    return (
        <View style={[...blockStyles, styles.row]} {...props} >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    }
})
