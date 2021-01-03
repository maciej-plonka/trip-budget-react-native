import {Currency, Money} from "../../../models/Money";
import React, {useCallback} from "react";
import InputWrapper from "./InputWrapper";
import {StyleSheet, Text, View} from "react-native"
import {CurrencyPicker, NumberInput} from "./BaseInputs";


type Props = BaseInputProps<Money> & {
    label: string,
    currencyEditable?: boolean
}
export const FormMoneyInput = ({value, onChanged, ...props}: Props) => {
    const handleAmountUpdate = useCallback((amount: number) => onChanged({...value, amount}), [value]);
    const handleCurrencyUpdate = useCallback((currency: Currency) => onChanged({...value, currency}), [value]);
    return (
        <InputWrapper {...props} icon={"money"}>
            <View style={styles.inputs}>
                <NumberInput style={styles.amount} value={value.amount} onChanged={handleAmountUpdate}/>
                {props.currencyEditable
                    ? (<CurrencyPicker style={styles.currency}  value={value.currency} onChanged={handleCurrencyUpdate}/>)
                    : (<Text style={styles.currency}>{value.currency}</Text>)
                }
            </View>

        </InputWrapper>

    )
}


const styles = StyleSheet.create({
    inputs: {
        flexDirection: "row",
        alignItems: "center",
    },
    amount: {
        flex: 1,
    },
    currency: {
        marginLeft: 4,
    }
});
