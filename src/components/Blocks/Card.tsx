import React from "react";
import {StyleSheet} from "react-native";
import {ColoredBackground} from "../ColoredBackground";
import {Color} from "../../models";
import {BlockProps, useBlockStyles} from "./Block";

type Props = BlockProps & {
    rounded?: boolean,
    color?: Color
    flat?: boolean
}
export const Card = ({rounded, children, flat, color = "white", ...props}: Props) => {
    const blockStyles = useBlockStyles(props)
    const cardStyle = [
        styles.root,
        blockStyles,
        rounded && styles.rounded,
        flat && styles.flat,
    ];
    return (
        <ColoredBackground color={color} style={cardStyle}  onLayout={props.onLayout}>
            {children}
        </ColoredBackground>
    )
}


const styles = StyleSheet.create({
    root: {
        elevation: 2,
    },
    flat: {
        elevation: 0,
    },
    rounded: {
        borderRadius: 8,
    }
});
