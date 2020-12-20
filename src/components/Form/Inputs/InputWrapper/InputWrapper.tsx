import React from "react";
import {StyleSheet, Text, View} from "react-native";
import InputIcon from "./InputIcon";


type Props = {
    label: string,
    icon?: IconName,
    children?: Array<JSX.Element | undefined> | JSX.Element
}
const InputWrapper = ({label, icon, children}: Props) => {
    return <View style={styles.wrapper}>
        {icon && <InputIcon icon={icon} styles={styles.icon} /> }
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
        marginBottom: 8
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

export default InputWrapper;
