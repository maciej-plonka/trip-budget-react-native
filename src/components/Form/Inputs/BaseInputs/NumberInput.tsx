import {StyleProp, StyleSheet, TextInput, ViewStyle} from "react-native";
import React, {useState} from "react";

type Props = BaseInputProps<number> & {
    style?: StyleProp<ViewStyle>
}

type Selection = { start: number, end: number }
const initialSelection: Selection = {start: 0, end: 0}
export const NumberInput = ({value, onChanged, style}: Props) => {
    const handleUpdate = (value: string) => {
        try {
            const numberValue = parseFloat(value)
            onChanged(isNaN(numberValue) ? 0 : numberValue)
        }catch(e) {
            console.error(e);
        }
    }
    const [selection, setSelection] = useState<Selection>(initialSelection)

    const updateSelection = (selection: Selection = initialSelection) => {
        setSelection(!value ? initialSelection : selection);
    }

    return (
        <TextInput style={[styles.input, style]}
                   keyboardType={"numeric"}
                   selection={selection}
                   onSelectionChange={(event) => updateSelection(event.nativeEvent.selection)}
                   value={value.toString()}
                   onChangeText={handleUpdate}/>
    )
};

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    }
});
