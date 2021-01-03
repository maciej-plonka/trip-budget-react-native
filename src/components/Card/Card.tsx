import React from "react";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import ColoredBackground from "../ColoredBackground";
import {Color} from "../../models/Colors";

type Props = {
    rounded?: boolean,
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>,
    color?: Color
    flat?: boolean
}
const Card = ({rounded, style, children, flat, color = "white"}: Props) => {
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
export default Card;
