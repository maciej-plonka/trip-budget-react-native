import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Parent} from "../../Blocks";
import {Icon, IconType} from "../../Icon";


type Props =Parent & {
    label: string,
    icon?: IconType
}
function getIconSize(iconType: IconType ) {
    if(iconType === "money") return 16;
    return 20;
}

export const InputWrapper = ({label, icon, children}: Props) => {
    return <View style={styles.wrapper}>
        {icon && <Icon iconType={icon} style={styles.icon} size={getIconSize(icon)} color={"#D04545"} /> }
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 16
    },
    label: {
        fontSize: 12
    },
    inputWrapper: {
        flexDirection: "column",
        flex: 1
    },
    icon: {
        marginBottom: 4,
        marginRight: 6
    },

});
