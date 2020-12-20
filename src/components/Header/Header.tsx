import React from "react";
import {StyleSheet, Text, View} from "react-native";
import HeaderBackground from "./HeaderBackground";
import {useTabContext} from "../../contexts/TabContext";
import HeaderTabs from "./HeaderTabs";


type Props = {
    color: string | Gradient,
    title: string,
}

const Header = ({color, title}: Props) => {
    const {tabs} = useTabContext()
    const isGradient = typeof color !== 'string'
    const height = (tabs && tabs.length) ? 124 : 82;
    const titleColor = isGradient ? 'white' : 'black'
    const backgroundStyle = [styles.container, isGradient && styles.containerLeft];
    const titleWrapperStyle = [styles.title, isGradient && styles.titleLeft];
    const titleTextStyle = [styles.titleText, {color: titleColor}];
    return (
        <View style={{height}}>
            <HeaderBackground style={backgroundStyle} color={color}>
                <View style={titleWrapperStyle}>
                    <Text style={titleTextStyle}>{title}</Text>
                </View>
                <HeaderTabs color={titleColor}/>
            </HeaderBackground>
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
