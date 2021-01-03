import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useThemeContext} from "../../contexts/ThemeContext";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import ColoredBackground from "../ColoredBackground";

interface FloatingActionButtonProps {
    onPress: () => void,
}

const FloatingActionButton = ({onPress}: FloatingActionButtonProps) => {
    const color = useThemeContext().colors.fab
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <ColoredBackground color={color} style={[StyleSheet.absoluteFill, styles.fab]}>
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
        right: 16,
    },
    fab: {
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    }

})

export default FloatingActionButton;
