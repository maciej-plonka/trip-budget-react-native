import React from "react";
import {Styled} from "../../Blocks";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {ItemValue} from "@react-native-picker/picker/typings/Picker";
import {InputProps} from "./InputProps";

type Props<T> = InputProps<T> & Styled & {
    values: ReadonlyArray<Required<T>>
    pickerStyle?: StyleProp<ViewStyle>
    keyExtractor: Extractor<T>
    labelExtractor: Extractor<T>
}
type Extractor<T> = (value: T) => string
export function RequiredSelect<T>(props: Props<T>) {
    const handleValueChange = (itemValue: ItemValue, index: number) => {
        const newValue = props.values[index]
        if(!newValue) throw Error(`Value with index ${index} is not valid`)
        props.onChanged(newValue)
    }
    return (
        <View style={[styles.targetHeight, styles.root, props.style]}>
            <Picker
                mode={"dialog"}
                style={[styles.targetHeight, props.pickerStyle]}
                selectedValue={props.keyExtractor(props.value)}
                onValueChange={handleValueChange}>
                {props.values.map(it => (
                    <Picker.Item key={props.keyExtractor(it)} value={props.keyExtractor(it)} label={props.labelExtractor(it)}/>
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
