import React, {useState} from "react";
import InputWrapper from "./InputWrapper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

const formatDate = (date: Date): string => [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(v => v < 10 ? "0" + v : "" + v)
    .join(".")

const FormCalendarInput = (props: BaseInputProps<Date>) => {
    const [show, setShow] = useState(false)
    const onDateChanged = (_: any, date: Date | undefined) => {
        date && props.onChanged(date)
        setShow(false)
    }
    const datePicker = show
        ? <RNDateTimePicker style={styles.input} value={props.value} mode={"date"} onChange={onDateChanged}/>
        : <View/>
    const formattedDate = formatDate(props.value);
    return (
        <TouchableHighlight onPress={() => setShow(true)}>
            <InputWrapper {...props} icon={"calendar"}>
                <Text style={styles.input}>{formattedDate}</Text>
                {datePicker}
            </InputWrapper>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%"
    },
});
export default FormCalendarInput;
