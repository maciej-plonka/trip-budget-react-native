import React, {FC, ReactElement} from "react";
import {Header, HeaderProps} from "./Header";
import {Content, ContentProps} from "./Content";
import {StyleSheet, View} from "react-native";
import {FABProps, FloatingActionButton} from "./FloatingActionButton";
import {Parent} from "../Blocks";


type ChildrenType =
    [ReactElement<HeaderProps>, ReactElement<ContentProps>] |
    [ReactElement<HeaderProps>, ReactElement<ContentProps>, ReactElement<FABProps>]

interface IComposition {
    Header: typeof Header
    Content: typeof Content,
    Fab: typeof FloatingActionButton
}

export const Screen: FC<Parent<ChildrenType>> & IComposition = ({children}) => (
    <View style={styles.screen}>{children}</View>
)

Screen.Header = Header
Screen.Content = Content
Screen.Fab = FloatingActionButton

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    }
});
