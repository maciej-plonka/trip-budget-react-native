import InputWrapper, {InputIconName} from "./InputWrapper";
import React from "react";
import {StyleSheet, TextInput, View} from "react-native";

type Props = BaseInputProps<string> & {
    label: string,
    icon?: InputIconName
}
export const FormTextArea = (props: Props) => {
    return (
        <InputWrapper {...props} >
            <TextInput style={styles.input}
                       value={props.value}
                       onChangeText={props.onChanged}
                       numberOfLines={4}
                       multiline/>
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
