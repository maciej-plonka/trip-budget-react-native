import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useThemeContext} from "../../contexts/ThemeContext";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import ColoredBackground from "../ColoredBackground";

interface FloatingActionButtonProps {
    onPress: () => void,
    onRight?:boolean
}

const FloatingActionButton = ({onPress, onRight}: FloatingActionButtonProps) => {
    const color = useThemeContext().colors.fab
    const offset = onRight ? styles.containerRight : styles.containerMiddle
    return (
        <TouchableOpacity style={[styles.container, offset]} onPress={onPress}>
            <ColoredBackground color={color} styles={[StyleSheet.absoluteFill, styles.fab]}>
                <MaterialCommunityIcons name={"plus"} size={48} color={"white"}/>
            </ColoredBackground>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 16,
        width: 62,
        height: 62,
    },
    containerMiddle: {
        left: "50%",
        transform: [{translateX: -31}],
    },
    containerRight: {
        right: 16,
    },
    fab: {
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    }

})

export default FloatingActionButton;
