import React, {FC} from "react";
import {StyleSheet, View} from "react-native";

export type ContentProps = {
    children?: React.ReactNode
}
export const Content: FC<ContentProps> = ({children}) => {
    return (
        <View style={styles.content}>{children}</View>
    )
}


const styles = StyleSheet.create({
    content: {
        flex: 1
    }
});
