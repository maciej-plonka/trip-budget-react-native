import React from "react";
import {StyleSheet, TextInput} from "react-native";
import InputWrapper, {InputIconName} from "./InputWrapper";

type Props = BaseInputProps<string> & {
    label: string,
    icon?: InputIconName,
}

export const FormTextInput  = (props: Props) => {
    return (
        <InputWrapper {...props}>
            <TextInput style={styles.input} value={props.value} onChangeText={props.onChanged}/>
        </InputWrapper>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%"
    },
});

