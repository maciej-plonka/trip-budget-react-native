import Tabs, {Tab} from "../contexts/TabContext";
import {StyleSheet, View} from "react-native";
import React from "react";
import Header from "../components/Header";
import FloatingActionButton from "../components/FloatingActionButton";
import {useThemeContext} from "../contexts/ThemeContext";
import ColoredBackground from "../components/ColoredBackground";
import {Color} from "../models/Colors";
type FabPosition = "center" | "right"
const isRight = (position:FabPosition) => position === "right"
type Props = {
    headerTabs?: Tab[],
    headerColor?: Color,
    title: string,
    fab?: {
        position: FabPosition
        onPress: () => void
    }
    children?: React.ReactNode
}

const Page = ({title, headerTabs = [], headerColor = 'white', fab, children}: Props) => {
    const theme = useThemeContext();
    return (
        <Tabs initialTabs={headerTabs}>
            <ColoredBackground color={theme.background} style={styles.container}>
                <Header color={headerColor} title={title}/>
                <View style={styles.content}>
                    {children}
                </View>
            </ColoredBackground>
            {fab && <FloatingActionButton onPress={fab.onPress} onRight={isRight(fab.position)}/>}
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
