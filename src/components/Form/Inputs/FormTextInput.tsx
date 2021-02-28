import React from "react";
import {StyleSheet, TextInput} from "react-native";
import {InputWrapper} from "./InputWrapper";
import {IconType} from "../../Icon";
import {InputProps} from "./InputProps";
import {ErrorMessage} from "../ErrorMessage";

type Props = InputProps<string> & {
    label: string,
    icon?: IconType,
    error?: string
}

export const FormTextInput  = ({error, ...props}: Props) => {
    return (
        <InputWrapper {...props} icon={"notes"}>
            <TextInput style={styles.input} value={props.value} onChangeText={props.onChanged}/>
            {error && <ErrorMessage>{error}</ErrorMessage>}
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

