import {Currency, Money} from "../../../../models/Money";
import React from "react";
import InputWrapper from "../InputWrapper";
import {StyleSheet, Text, View} from "react-native"
import {NumberInput} from "./NumberInput";
import {CurrencyPicker} from "./CurrencyPicker";


type Props = BaseInputProps<Money> & {
    label: string,
    currencyEditable?: boolean
}
export const FormMoneyInput = ({value, onChanged, currencyEditable, ...props}: Props) => {
    const handleUpdate = (partialChange: Partial<Money>) => onChanged({...value, ...partialChange})
    const handleAmountUpdate = (amount: number) => handleUpdate({amount})
    const handleCurrencyUpdate = (currency: Currency) => handleUpdate({currency})
    const {currency, amount} = value
    return (
        <InputWrapper {...props} icon={"money"}>
            <View style={styles.inputs}>
                <NumberInput style={styles.amount} value={amount} onChanged={handleAmountUpdate}/>
                {currencyEditable
                    ? (<CurrencyPicker style={styles.currency} value={currency}
                                       onChanged={handleCurrencyUpdate}/>)
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
