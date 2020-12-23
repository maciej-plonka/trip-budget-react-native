import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FormButtonIcon from "./FormButtonIcon";
import ColoredBackground from "../../ColoredBackground";

type Props = {
    icon: ButtonIcon,
    color: string | Gradient
    text?: string
    onClick: () => void
}

const FormButton = ({color, icon, text, onClick}: Props) => {
    const textComponent = text != null ? <Text style={styles.text}>{text}</Text> : <View/>
    return (
        <TouchableOpacity onPress={() => onClick()}>
            <ColoredBackground color={color} styles={styles.root}>
                {icon && <FormButtonIcon icon={icon}/>}
                {textComponent}
            </ColoredBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white"
    }
});
export default FormButton;
