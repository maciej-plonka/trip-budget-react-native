import React, {useCallback, useState} from "react";
import InputWrapper from "./InputWrapper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const formatDate = (date: Date): string => [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(v => v < 10 ? "0" + v : "" + v)
    .join(".")

const FormCalendarInput = (props: BaseInputProps<Date>) => {
    const [show, setShow] = useState<boolean>(false)
    const onDateChanged = useCallback((_: any, date: Date | undefined) => {
        date && props.onChanged(date)
        setShow(false);
    }, [])

    const formattedDate = formatDate(props.value);
    return (
        <React.Fragment>
            <TouchableOpacity onPress={() => setShow(true)}>
                <InputWrapper {...props} icon={"calendar"}>
                    <Text style={styles.input}>{formattedDate}</Text>
                </InputWrapper>
            </TouchableOpacity>
            {show && <RNDateTimePicker value={props.value} mode={"date"} onChange={onDateChanged} />}
        </React.Fragment>
    )
};

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%"
    },
});
export default FormCalendarInput;
