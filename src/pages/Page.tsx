import Tabs, {Tab} from "../contexts/TabContext";
import {StyleSheet, View} from "react-native";
import React from "react";
import Header from "../components/Header";
import FloatingActionButton from "../components/FloatingActionButton";
import {useThemeContext} from "../contexts/ThemeContext";

type Props = {
    headerTabs?: Tab[],
    headerColor?: string | Gradient,
    title: string,
    fab?: {
        onRight?: boolean,
        onPress: () => void
    }
    children?: React.ReactNode
}

const Page = ({title, headerTabs = [], headerColor = 'white', fab, children}: Props) => {
    const theme = useThemeContext();
    const containerWithBackgroundColor = [styles.container, {backgroundColor: theme.background}];
    return (
        <Tabs initialTabs={headerTabs}>
            <View style={containerWithBackgroundColor}>
                <Header color={headerColor} title={title}/>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
            {fab && <FloatingActionButton onPress={fab.onPress} onRight={fab.onRight}/>}
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
