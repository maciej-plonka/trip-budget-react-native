import {Money} from "../../../../models";
import React from "react";
import {InputWrapper} from "../InputWrapper";
import {StyleSheet} from "react-native"
import {MoneyInput} from "./MoneyInput";
import {InputProps} from "../InputProps";
import {ErrorMessage} from "../../ErrorMessage";


type Props = InputProps<Money> & {
    label: string,
    currencyEditable?: boolean,
    error?: string
}
export const FormMoneyInput = ({error,...props}: Props) => {
    return (
        <InputWrapper {...props} icon={"money"}>
            <MoneyInput {...props}/>
            {error && <ErrorMessage>{error}</ErrorMessage>}
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
