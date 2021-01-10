import {BudgetCategory} from "../../../store/states";
import InputWrapper from "./InputWrapper";
import React from "react";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet, View} from "react-native";

type Props = BaseInputProps<BudgetCategory | undefined> & {
    label: string,
    values: Readonly<BudgetCategory[]>
}
export const FormCategoryPicker = (props: Props) => {
    const handleValueChange = (value: string | number) => {
        if (typeof value === 'string') return
        const targetCategory = props.values.find(it => it.id === value)
        props.onChanged(targetCategory)
    }
    const selectedValue = props.value?.id ?? -1
    return (
        <InputWrapper {...props} icon={"category"}>
            <View style={[styles.targetHeight, styles.picker]} >
                <Picker style={styles.targetHeight} selectedValue={selectedValue} onValueChange={handleValueChange}>
                    <Picker.Item value={-1} label={"None"}/>
                    {props.values.map(it => (
                        <Picker.Item key={it.id} value={it.id} label={it.name}/>
                    ))}
                </Picker>
            </View>
        </InputWrapper>
    )
}


const styles = StyleSheet.create({
    targetHeight: {
        height: 28,
    },
    picker: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        height: 28,
        width: "100%"
    },
});