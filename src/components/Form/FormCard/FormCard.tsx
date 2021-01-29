import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Card} from "../../Card";
import MaskedView from "@react-native-community/masked-view";

type Props = {
    avatar?: React.ReactNode
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
}

const FormCard = ({children, avatar, style}: Props) => {
    const hasAvatar = !!avatar
    return (
        <Card style={[styles.root, hasAvatar && styles.mindAvatar, style]}>
            {avatar && (
                <MaskedView style={styles.avatarWrapper} maskElement={<View style={styles.avatar}/>}>
                    {avatar}
                </MaskedView>
            )}
            {children}
        </Card>
    )
}


const styles = StyleSheet.create({
    root: {
        position: "relative",
        flexDirection: "column",
        padding: 16,
        paddingHorizontal: 24,
    },

    mindAvatar: {
        marginTop: 128,
        paddingTop: 128,
    },

    avatarWrapper: {
        left: "50%",
        top: 0,
        width: 192,
        height: 192,
        transform: [{translateX: -(96 - 16)}, {translateY: -96}],
        backgroundColor: "white",


        position: "absolute",
        justifyContent: "center",
        alignItems: "center"
    },

    avatar: {
        borderRadius: 96,
        width: "100%",
        height: "100%",
        backgroundColor: "black"
    }
});

export default FormCard;
