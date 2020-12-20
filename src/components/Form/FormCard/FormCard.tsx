import React from "react";
import {StyleSheet, View} from "react-native";

type Props = {
    children?: React.ReactNode
}

const FormCard: React.FC<Props> = ({children}) => {
    return <View style={styles.root}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        minHeight: 200,
        backgroundColor: "white",
        padding: 16,
        paddingHorizontal: 24,
        elevation: 3,
    }
});

export default FormCard;
