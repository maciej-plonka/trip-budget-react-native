import React, {useCallback, useState} from "react";
import {InputWrapper} from "./InputWrapper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {format} from "date-fns";
import {InputProps} from "./InputProps";
import {ErrorMessage} from "../ErrorMessage";

type Props = InputProps<Date> & {
    label: string,
    error?: string
}
export const FormCalendarInput = (props: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const onDateChanged = useCallback((_: any, date: Date | undefined) => {
        setShow(() => false);
        date && props.onChanged(date)
    }, [])

    return (
        <React.Fragment>
            {show && <RNDateTimePicker value={props.value} mode={"date"} onChange={onDateChanged}/>}
            <TouchableOpacity onPress={() => setShow(true)}>
                <InputWrapper {...props} icon={"calendar"}>
                    <Text style={styles.input}>{format(props.value, "dd.MM.yyyy")}</Text>
                </InputWrapper>
            </TouchableOpacity>
            {props.error && <ErrorMessage>{props.error}</ErrorMessage>}
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
