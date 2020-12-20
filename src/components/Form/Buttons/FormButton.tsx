import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FormButtonBackground from "./FormButtonBackground";
import FormButtonIcon from "./FormButtonIcon";

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
            <FormButtonBackground style={styles.root} color={color}>
                {icon && <FormButtonIcon icon={icon}/>}
                {textComponent}
            </FormButtonBackground>
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
