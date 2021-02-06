import {InputWrapper} from "./InputWrapper";
import React from "react";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet, View} from "react-native";
import {BudgetCategory} from "../../../store/models";
import {findBy} from "../../../utils/Collections";

type Props = BaseInputProps<BudgetCategory | undefined> & {
    label: string,
    values: ReadonlyArray<BudgetCategory>
    unselectedLabel?: string,
    iconDisabled?: boolean
}

const unselectedValue = "-1"

export const FormCategoryPicker = (props: Props) => {
    const handleValueChange = (value: string | number) => {
        if (typeof value === 'number') return
        props.onChanged(findBy(props.values, "id", value))
    }
    const unselectedLabel = props.unselectedLabel ?? "None"
    const selectedValue = props.value?.id ?? unselectedValue
    const icon = props.iconDisabled ? undefined : "category"
    return (
        <InputWrapper {...props} icon={icon}>
            <View style={[styles.targetHeight, styles.picker]}>
                <Picker style={styles.targetHeight} selectedValue={selectedValue} onValueChange={handleValueChange}>
                    <Picker.Item value={unselectedValue} label={unselectedLabel}/>
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
