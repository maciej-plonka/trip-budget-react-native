import React from "react";
import {StyleSheet, TextInput} from "react-native";
import InputWrapper from "./InputWrapper";


const FormTextInput: React.FC<BaseInputProps<string>> = (props) => {
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

export default FormTextInput;
