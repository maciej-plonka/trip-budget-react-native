import React, {FC} from "react";
import {Box, Row} from "../../Blocks";
import {StyleSheet} from "react-native";
import {BottomDrawerItem} from "./BottomDrawerItem";

export type NavigationTarget = "budget" | "wish"
const targets: ReadonlyArray<NavigationTarget> = ["budget", "wish"]

export type BottomDrawerProps = {
    current: NavigationTarget,
    onNavigate: (navigation: NavigationTarget) => void
}

export const BottomDrawer: FC<BottomDrawerProps> = ({current, onNavigate}) => {

    return (
        <Box style={styles.container}>
            <Row justifyContent={"flex-start"} flex={1}>
                {targets.map((it, index) => (
                    <Box key={index} marginHorizontal={8}>
                        <BottomDrawerItem
                            item={it}
                            onClick={() => onNavigate(it)}
                            selected={it === current}/>
                    </Box>
                ))}
            </Row>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "white",
    },

})
