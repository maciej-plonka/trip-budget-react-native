import React from "react";
import {StyleSheet, Text} from "react-native";
import {Styled} from "./Blocks";

type Props =  Styled &{
    children: string
}
export const TextWhite = ({children, style}: Props) => (
    <Text style={[styles.baseText, style]}>{children}</Text>
)

const styles = StyleSheet.create({
    baseText: {
        color: "white"
    }
})
