import React from "react";
import {BlockProps, useBlockStyles} from "./Block";
import {View} from "react-native";

export const Box = ({children, ...props}: BlockProps) => {
    return (
        <View style={useBlockStyles(props)}>
            {children}
        </View>
    )
}
