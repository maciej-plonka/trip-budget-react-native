import React from "react";
import {Styled} from "../../Blocks";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {ItemValue} from "@react-native-picker/picker/typings/Picker";
import {InputProps} from "./InputProps";

type Props<T> = InputProps<T | undefined> & Styled & {
    values: ReadonlyArray<Required<T>>
    pickerStyle?: StyleProp<ViewStyle>
    unselectedKey?: string
    unselectedLabel?: string
    keyExtractor?: Extractor<T>
    labelExtractor?: Extractor<T>
}
type Extractor<T> = (value: T) => string
const defaultExtractor: Extractor<any> = (v) =>  {
    try{
        return JSON.stringify(v)
    }catch(e) {
        return v.toString()
    }
};

export function Select<T>(props: Props<T>) {
    const unselectedKey = props.unselectedKey ?? "-1"
    const unselectedLabel = props.unselectedLabel ?? "None"
    const keyExtractor = props.keyExtractor ?? defaultExtractor
    const labelExtractor = props.labelExtractor ?? defaultExtractor
    const handleValueChange = (itemValue: ItemValue, index: number) => {
        const newValue = index > 0 ? props.values[index - 1] : undefined
        props.onChanged(newValue)
    }
    return (
        <View style={[styles.targetHeight, styles.root, props.style]}>
            <Picker
                mode={"dialog"}
                style={[styles.targetHeight, props.pickerStyle]}
                selectedValue={props.value ? keyExtractor(props.value) : undefined}
                onValueChange={handleValueChange}>
                <Picker.Item value={unselectedKey} label={unselectedLabel}/>
                {props.values.map(it => (
                    <Picker.Item key={keyExtractor(it)} value={keyExtractor(it)} label={labelExtractor(it)}/>
                ))}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        height: 28,
        width: "100%"
    },
    targetHeight: {
        height: 28,
    },
});
