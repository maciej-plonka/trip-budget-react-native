import React, {FC, ReactElement} from "react";
import {Header, HeaderProps} from "./Header";
import {Content, ContentProps} from "./Content";
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import {FABProps, FloatingActionButton} from "./FloatingActionButton";
import {Parent} from "../Blocks";
import {BottomDrawer, BottomDrawerProps} from "./ButtonDrawer";

type E<T> = ReactElement<T>
type ChildrenType =
    [E<HeaderProps>, E<ContentProps>] |
    [E<HeaderProps>, E<ContentProps>, E<FABProps>] |
    [E<HeaderProps>, E<ContentProps>, E<BottomDrawerProps>, E<FABProps>]

interface IComposition {
    Header: typeof Header
    Content: typeof Content,
    Fab: typeof FloatingActionButton,
    BottomDrawer: typeof BottomDrawer
}

export const Screen: FC<Parent<ChildrenType>> & IComposition = ({children}) => (
   <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={{flex: 1}}
   >
       <View style={styles.screen}>{children}</View>
   </KeyboardAvoidingView>
)

Screen.Header = Header
Screen.Content = Content
Screen.Fab = FloatingActionButton
Screen.BottomDrawer = BottomDrawer

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    }
});
