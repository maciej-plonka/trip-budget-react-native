import React, {FC} from "react";
import {Row} from "../../Blocks";
import {StyleSheet, View} from "react-native";
import {BottomDrawerItem} from "./BottomDrawerItem";

export type NavigationTarget = "budget" | "wish"
const targets: ReadonlyArray<NavigationTarget> = ["budget", "wish"]

export type BottomDrawerProps = {
    current: NavigationTarget,
    onNavigate: (navigation: NavigationTarget) => void
}

export const BottomDrawer: FC<BottomDrawerProps> = ({current, onNavigate}) => {

    return (
        <View style={styles.container}>
            <Row justifyContent={"space-between"}>
                {targets.map(it => (
                    <BottomDrawerItem key={it}
                                      item={it}
                                      onClick={() => onNavigate(it)}
                                      selected={it === current}/>
                ))}
            </Row>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingHorizontal: 16,
        backgroundColor: "white"
    },

})
