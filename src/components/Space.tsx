import React from "react";
import {View} from "react-native";

type Props = {
    direction?: "vertical" | "horizontal",
    size: number,
}

export const Space = ({size, direction = "horizontal"}:Props) => {
    const style = {[direction == "horizontal" ? "width" : "height"]: size}
    return (
        <View style={style}/>
    )
}
