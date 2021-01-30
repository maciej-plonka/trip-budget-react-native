import React, {FC} from "react";
import {StyleSheet} from "react-native";
import {useBackgroundColor} from "../../contexts/ThemeContext";
import {ColoredBackground} from "../ColoredBackground";

export type ContentProps = {
    children?: React.ReactNode
}

export const Content: FC<ContentProps> = ({children}) => {
    const backgroundColor = useBackgroundColor()
    return (
        <ColoredBackground style={styles.content} color={backgroundColor}>{children}</ColoredBackground>
    )
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
});
