import {Parent, Row} from "../../Blocks";
import {Dimensions, ScrollView, View} from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width
export const ChildrenWrapper = ({children}: Parent) => {
    if (!children) return (<View/>)
    if (!Array.isArray(children) || children.length <= 4) {
        return (
            <Row justifyContent={"space-between"}>
                {children}
            </Row>
        )
    }
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            snapToStart
            snapToEnd
            contentContainerStyle={{justifyContent: "space-between", minWidth: windowWidth}}>
            {children}
        </ScrollView>
    )
}
