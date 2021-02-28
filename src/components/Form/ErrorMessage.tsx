import React from "react";
import {ForcedParent} from "../Blocks";
import {StyleSheet, Text, View} from "react-native";

type Props = ForcedParent<string>
export const ErrorMessage = ({children}: Props) => {
    return (
        <View style={styles.root}  >
            <Text style={styles.error}>{children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        width: "100%",
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderColor: "red",
        borderWidth: 1,
    },
    error: {
        color: "red"
    }
})
