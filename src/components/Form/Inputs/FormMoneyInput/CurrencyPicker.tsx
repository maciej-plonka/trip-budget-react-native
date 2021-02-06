import React from "react";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet, View} from "react-native";
import {availableCurrencies, Currency} from "../../../../models/Money";
import {ItemValue} from "@react-native-picker/picker/typings/Picker";
import {Styled} from "../../../Blocks";


type Props<T> = BaseInputProps<Currency> & Styled

export const CurrencyPicker = ({value, onChanged, style}: Props<Currency>) => {
    const handleValueChanged = (newValue: ItemValue) => {
        if (typeof newValue === "number") return;
        newValue && onChanged(newValue as Currency)
    }
    return (
        <View style={[styles.root, style]}>
            <Picker style={styles.picker}  mode={"dialog"} selectedValue={value} onValueChange={handleValueChanged}>
                {availableCurrencies().map(it => (
                    <Picker.Item key={it} value={it} label={it}/>
                ))}
            </Picker>
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        width:75,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    picker: {
        height: 28,
    }
});
