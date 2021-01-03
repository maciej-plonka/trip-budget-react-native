import Tabs, {Tab} from "../contexts/TabContext";
import {StyleSheet, View} from "react-native";
import React from "react";
import Header from "../components/Header";
import FloatingActionButton from "../components/FloatingActionButton";
import {useThemeContext} from "../contexts/ThemeContext";
import ColoredBackground from "../components/ColoredBackground";
import {Color} from "../models/Colors";

type Props = {
    headerTabs?: Tab[],
    headerColor?: Color,
    title: string,
    fab?: {
        onPress: () => void
    }
    children?: React.ReactNode
}

const Page = ({title, headerTabs = [], headerColor = 'white', fab, children}: Props) => {
    const theme = useThemeContext();
    return (
        <Tabs initialTabs={headerTabs}>
            <Header color={headerColor} title={title}/>
            <ColoredBackground color={theme.background} style={{flex: 1}}>
                {children}
            </ColoredBackground>
            {fab && <FloatingActionButton onPress={fab.onPress}/>}
        </Tabs>
    )
}


export default Page;
