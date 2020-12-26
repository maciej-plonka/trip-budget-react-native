import React from "react";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import ColoredBackground from "../ColoredBackground";

type Props = {
    rounded?: boolean,
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>,
    color?: Color
}
const Card = ({rounded, style, children, color = "white"}: Props) => {
    const cardStyle = [
        styles.root,
        rounded && styles.rounded,
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
    rounded: {
        borderRadius: 8,
    }
});
export default Card;
