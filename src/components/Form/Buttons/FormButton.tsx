import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import FormButtonIcon from "./FormButtonIcon";
import {ColoredBackground} from "../../ColoredBackground";
import {Color} from "../../../models/Colors";

type Props = {
    icon: ButtonIcon,
    color: Color
    text?: string
    onClick: () => void
}

const FormButton = ({color, icon, text, onClick}: Props) => {
    const isFullWidth = !!icon && !!text
    return (
        <TouchableOpacity onPress={() => onClick()}>
            <ColoredBackground color={color} style={[styles.root, isFullWidth && styles.fullWidth]}>
                {icon && <FormButtonIcon icon={icon}/>}
                {text && <Text style={styles.categoryText}>{text}</Text> }
            </ColoredBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        marginLeft: 8,
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    fullWidth: {
        maxWidth: 120,
    },

    categoryText: {
        color: "white",
        marginLeft: 4
    },
});
export default FormButton;
