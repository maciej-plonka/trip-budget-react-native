import {StyleProp, StyleSheet, TextInput, ViewStyle} from "react-native";
import React, {useEffect, useState} from "react";

type Props = BaseInputProps<number> & {
    style?: StyleProp<ViewStyle>
}

type Selection = { start: number, end: number }
const buildSelection = (index: number): Selection => ({start: index, end: index})
const initialSelection: Selection = buildSelection(0)
export const NumberInput = ({value, onChanged, style}: Props) => {
    const [selection, setSelection] = useState<Selection>(initialSelection)
    useEffect(() => {
        !value && setSelection(initialSelection)
    }, [value]);

    const handleUpdate = (value: string) => {
        if([".",","].includes(value[value.length - 1])) {
            value += '0'
        }
        try {
            if(isNaN(+value) ) {
                return;
            }
            const numberValue = parseFloat(value)
            onChanged(isNaN(numberValue) ? 0 : numberValue)
        }catch(e) {
            console.error(e);
        }



    }
    try {
        return (
            <TextInput style={[styles.input, style]}
                       keyboardType={"numeric"}
                       selection={selection}
                       onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
                       value={value.toString()}
                       onChangeText={handleUpdate}/>
        )
    }catch(e) {
        console.error(e)
    }
};

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    }
});
