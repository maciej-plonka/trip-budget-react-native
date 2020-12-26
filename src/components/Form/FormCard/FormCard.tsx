import React from "react";
import {StyleSheet} from "react-native";
import Card from "../../Card";

type Props = {
    children?: React.ReactNode
}

const FormCard: React.FC<Props> = ({children}) => {
    return (
        <Card style={styles.root}>
            {children}
        </Card>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        minHeight: 200,
        padding: 16,
        paddingHorizontal: 24,
    }
});

export default FormCard;
