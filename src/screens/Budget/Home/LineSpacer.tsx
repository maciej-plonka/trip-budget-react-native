import {StyleSheet, View} from "react-native";
import React from "react";

type Props = {
    color: string
}

export function LineSpacer(props: Props) {
    return <View style={[styles.spacer, {borderBottomColor: props.color}]}/>
}

const styles = StyleSheet.create({
    spacer: {
        width: "100%",
        height: 0,
        borderBottomWidth: 1,
    }
})
