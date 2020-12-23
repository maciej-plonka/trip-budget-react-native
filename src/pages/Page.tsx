import Tabs, {Tab} from "../contexts/TabContext";
import {StyleSheet, View} from "react-native";
import React from "react";
import Header from "../components/Header";
import FloatingActionButton from "../components/FloatingActionButton";
import {useThemeContext} from "../contexts/ThemeContext";
import ColoredBackground from "../components/ColoredBackground";

type Props = {
    headerTabs?: Tab[],
    headerColor?: Color,
    title: string,
    fab?: {
        position: "center" | "right"
        onPress: () => void
    }
    children?: React.ReactNode
}

const Page = ({title, headerTabs = [], headerColor = 'white', fab, children}: Props) => {
    const theme = useThemeContext();
    return (
        <Tabs initialTabs={headerTabs}>
            <ColoredBackground color={theme.background} styles={styles.container}>
                <Header color={headerColor} title={title}/>
                <View style={styles.content}>
                    {children}
                </View>
            </ColoredBackground>
            {fab && <FloatingActionButton onPress={fab.onPress} onRight={fab.position === "right"}/>}
        </Tabs>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    content: {
        flex: 1,
    }
});


export default Page;
