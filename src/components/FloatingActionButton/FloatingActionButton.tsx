import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useThemeContext} from "../../contexts/ThemeContext";
import {MaterialCommunityIcons} from '@expo/vector-icons';

interface FloatingActionButtonProps {
    onPress: () => void,
    onRight?:boolean
}

const FloatingActionButton = ({onPress, onRight}: FloatingActionButtonProps) => {
    const {colors, start, end} = useThemeContext().colors.fab
    const offset = onRight ? styles.containerRight : styles.containerMiddle
    return (
        <TouchableOpacity style={[styles.container, offset]} onPress={onPress}>
            <LinearGradient colors={colors} start={start} end={end} style={[StyleSheet.absoluteFill, styles.fab]} >
                <MaterialCommunityIcons name={"plus"} size={48} color={"white"}/>
            </LinearGradient>
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
