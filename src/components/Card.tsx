import React from "react";
import {StyleSheet} from "react-native";
import {ColoredBackground} from "./ColoredBackground";
import {Color} from "../models/Colors";
import {Parent, Styled} from "./Blocks";

type Props =Styled & Parent &  {
    rounded?: boolean,
    color?: Color
    flat?: boolean
}
export const  Card = ({rounded, style, children, flat, color = "white"}: Props) => {
    const cardStyle = [
        styles.root,
        rounded && styles.rounded,
        flat && styles.flat,
        style
    ];
    return (
        <ColoredBackground color={color} style={cardStyle}>
            {children}
        </ColoredBackground>
    )
}


const styles = StyleSheet.create({
    root: {
        elevation: 3,
    },
    flat: {
        elevation: 0,
    },
    rounded: {
        borderRadius: 8,
    }
});
