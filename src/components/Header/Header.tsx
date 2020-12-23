import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTabContext} from "../../contexts/TabContext";
import HeaderTabs from "./HeaderTabs";
import ColoredBackground from "../ColoredBackground";


type Props = {
    color: Color,
    title: string,
}

const isGradient = (color:Color) => typeof color !== 'string'

const Header = ({color, title}: Props) => {
    const {tabs} = useTabContext()
    const rootStyles = {height: (tabs && tabs.length) ? 124 : 82 }
    const titleColor = isGradient(color) ? 'white' : 'black'
    const backgroundStyle = [styles.container, StyleSheet.absoluteFill ,isGradient(color) && styles.containerLeft];
    const titleWrapperStyle = [styles.title, isGradient(color) && styles.titleLeft];
    const titleTextStyle = [styles.titleText, {color: titleColor}];
    return (
        <View style={rootStyles}>
            <ColoredBackground styles={backgroundStyle} color={color}>
                <View style={titleWrapperStyle}>
                    <Text style={titleTextStyle}>{title}</Text>
                </View>
                <HeaderTabs color={titleColor}/>
            </ColoredBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
    },

    containerLeft: {
        alignItems: "flex-start"
    },
    title: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    titleLeft: {
        justifyContent: "flex-end",
        marginBottom: 16
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 24
    }
})

export default Header;
