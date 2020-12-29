import React from "react";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import Card from "../../Card";

type Props = {
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
}

const FormCard = ({children, style}: Props) => {
    return (
        <Card style={[styles.root, style]}>
            {children}
        </Card>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        padding: 16,
        paddingHorizontal: 24,
    }
});

export default FormCard;
