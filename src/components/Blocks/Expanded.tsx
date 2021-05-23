import React from "react";
import {Styled} from "./Styled";
import {View} from "react-native";
import {Parent} from "./Parent";

type Props = Styled & Parent & {
    flex?: number,
}

export function Expanded({flex = 1, style, children}: Props) {
    return (
        <View style={[style, {flex}]}>
            {children}
        </View>
    )
}
