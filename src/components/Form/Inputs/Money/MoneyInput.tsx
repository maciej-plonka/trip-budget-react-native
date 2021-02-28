import {availableCurrencies, Currency, Money} from "../../../../models";
import React from "react";
import {StyleSheet, Text} from "react-native"
import {NumberInput} from "./NumberInput";
import {InputProps} from "../InputProps";
import {Row} from "../../../Blocks";
import {Select} from "../Select";
import {RequiredSelect} from "../RequiredSelect";

type Props = InputProps<Money> & {
    currencyEditable?: boolean
}
export const MoneyInput = (props: Props) => {
    const {onChanged, value, currencyEditable} = props
    const handleUpdate = (partialChange: Partial<Money>) => {
        const money: Money = {...value, ...partialChange}
        onChanged(money)
    }
    const handleAmountUpdate = (amount: number) => handleUpdate({amount})
    const handleCurrencyUpdate = (currency: Currency | undefined) => handleUpdate({currency})
    const {currency, amount} = value
    return (
        <Row alignItems={"center"}>
            <NumberInput style={styles.amount} value={amount} onChanged={handleAmountUpdate}/>
            {currencyEditable
                ? (
                    <RequiredSelect<Currency>
                        onChanged={handleCurrencyUpdate}
                        value={currency}
                        style={styles.currency}
                        labelExtractor={it => it}
                        values={availableCurrencies}
                        keyExtractor={it => it}/>)
                : (<Text style={styles.currency}>{currency}</Text>)
            }
        </Row>
    )
}


const styles = StyleSheet.create({
    amount: {
        flex: 1,
    },
    currency: {
        marginLeft: 4,
        maxWidth: 75
    },
});
