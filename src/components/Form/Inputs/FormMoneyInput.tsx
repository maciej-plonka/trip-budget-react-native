import React from "react";
import InputWrapper from "./InputWrapper";
import {StyleSheet, TextInput} from "react-native";

type Props = BaseInputProps<number> & {
    currency?: string
}
const FormMoneyInput = (props: Props) => {
    const icon = props.icon || "money"
    const currency = props.currency || "¥"
    const onChange = (value: string) => {
        const money = value.replace(currency, "");
        const moneyValue = parseInt(money, 10)
        if (isNaN(moneyValue)) return;
        props.onChanged(moneyValue);
    }
    return (
        <InputWrapper {...props} icon={icon}>
            <TextInput style={styles.input} value={props.value + currency} onChangeText={onChange} />
        </InputWrapper>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%"
    }
});

export default FormMoneyInput;
