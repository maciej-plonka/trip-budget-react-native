import React from "react";
import {StyleSheet, View} from "react-native";

type Props = {
    children?: React.ReactNode,
    left?: boolean,
    right?: boolean,
    center?: boolean
}
const FormButtonRow = ({children,left, right, center}: Props) => {
    const resultStyles = [
        styles.root,
        left && styles.left,
        right && styles.right,
        center && styles.center
    ]
    return <View style={resultStyles}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        flexDirection: "row"
    },
    left: {
        justifyContent: "flex-start"
    },
    right: {
        justifyContent: "flex-end"
    },
    center: {
        justifyContent: "center"
    }
});

export default FormButtonRow;
