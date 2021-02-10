import React, {FC} from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Button} from "../Button";
import {Icon} from "../Icon";

export type FABProps = {
    onClick: () => void,
    position?: "right" | "center"
}

const fabStyles = (position:"right" | "center" ): StyleProp<ViewStyle>[] => [
    styles.container,
    position === "right" && styles.containerRight,
    position === "center" && styles.containerCenter
]

export const FloatingActionButton:FC<FABProps> = ({onClick, position = "right"}) => {
    return (
        <View style={fabStyles(position)}>
            <Button style={styles.fab} onClick={onClick} color={"primary"}>
                <Icon iconType={"plus"} size={48} color={"white"} />
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 2,
    },

    containerCenter: {
        bottom: 28,
        alignSelf: "center"
    },
    containerRight: {
        bottom: 16,
        right: 16,
    },

    fab: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    }

})
