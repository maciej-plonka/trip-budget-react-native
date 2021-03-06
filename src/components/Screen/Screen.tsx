import React, {FC, ReactElement, useMemo} from "react";
import {Header, HeaderProps} from "./Header";
import {Content, ContentProps} from "./Content";
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet} from "react-native";
import {FABProps, FloatingActionButton} from "./FloatingActionButton";
import {Parent} from "../Blocks";
import {BottomDrawer, BottomDrawerProps} from "./ButtonDrawer";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";

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
const keyboardAvoidingBehaviour = Platform.OS === "ios" ? "padding" : "height"

const insetStyle = (edgeInsets: EdgeInsets) => ({
    paddingTop: edgeInsets.top,
    paddingBottom: edgeInsets.bottom,
    paddingLeft: edgeInsets.left,
    paddingRight: edgeInsets.right
})

export const Screen: FC<Parent<ChildrenType>> & IComposition = ({children}) => {
    const edgeInsets = useSafeAreaInsets();
    const style = useMemo(() => insetStyle(edgeInsets) ,[edgeInsets])
    return (
        <KeyboardAvoidingView behavior={keyboardAvoidingBehaviour} style={{flex: 1}}>
            <SafeAreaView style={[styles.screen, style]}>
                {children}
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}
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
