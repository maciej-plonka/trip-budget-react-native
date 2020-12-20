import Tabs, {Tab} from "../contexts/TabContext";
import {ScrollView, StyleSheet, View} from "react-native";
import React from "react";
import Header from "../components/Header";
import FloatingActionButton from "../components/FloatingActionButton";
import {useThemeContext} from "../contexts/ThemeContext";

interface PageProps {
    headerTabs?: Tab[],
    color?: string | [string, string],
    title: string,
    fab?: {
        onRight?: boolean,
        onPress: () => void
    }
    children?: Array<JSX.Element | undefined> | JSX.Element
}

const Page = ({title, headerTabs = [], color = 'white',fab ,children}: PageProps) => {
    const theme = useThemeContext();
    return <Tabs initialTabs={headerTabs}>
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Header color={color} title={title} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
        {fab && <FloatingActionButton onPress={fab.onPress} onRight={fab.onRight}/>}

    </Tabs>
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
