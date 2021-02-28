import {InputWrapper} from "./InputWrapper";
import React from "react";
import {StyleSheet, TextInput} from "react-native";
import {IconType} from "../../Icon";
import {InputProps} from "./InputProps";
import {ErrorMessage} from "../ErrorMessage";

type Props = InputProps<string> & {
    label: string,
    error?: string,
    icon?: IconType
}
export const FormTextArea = (props: Props) => {
    return (
        <InputWrapper {...props} icon={"notes"}>
            <TextInput style={styles.input}
                       value={props.value}
                       onChangeText={props.onChanged}
                       numberOfLines={4}
                       multiline/>
            {props.error && <ErrorMessage>props.error</ErrorMessage>}
        </InputWrapper>
    )
}


const styles = StyleSheet.create({
    input: {
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        backgroundColor: "#fafafa",
        textAlignVertical: "top"
    }
});
