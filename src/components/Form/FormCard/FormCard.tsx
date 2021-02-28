import React from "react";
import {StyleSheet, View} from "react-native";
import {Card} from "../../Blocks/Card";
import MaskedView from "@react-native-community/masked-view";
import {Column, Parent, Styled} from "../../Blocks";

type Props = Styled & Parent & {
    avatar?: React.ReactNode
}

const FormCard = ({children, avatar, style}: Props) => {
    return (
        <Card style={[styles.root, !!avatar && styles.avatarGap, style]}>
            {avatar && (
                <MaskedView style={styles.avatarWrapper} maskElement={<View style={styles.avatar}/>}>
                    {avatar}
                </MaskedView>
            )}
            <Column>
                {children}
            </Column>
        </Card>
    )
}


const styles = StyleSheet.create({
    root: {
        position: "relative",
        flexDirection: "column",
        padding: 16,
    },

    avatarGap: {
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
