import React, {FC} from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "../Button";
import {Icon} from "../Icon";

export type FABProps = {
    onClick: () => void
}
export const FloatingActionButton:FC<FABProps> = ({onClick}) => {
    return (
        <View style={styles.container}>
            <Button style={styles.fab} onClick={onClick} color={"primary"}>
                <Icon iconType={"plus"} size={48} color={"white"} />
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
    fab: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    }

})
