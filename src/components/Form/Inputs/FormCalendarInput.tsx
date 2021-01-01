import React, {useCallback, useState} from "react";
import InputWrapper from "./InputWrapper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {format} from "date-fns";
type Props = BaseInputProps<Date> & {
    label: string
}
export const FormCalendarInput = (props: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const onDateChanged = useCallback((_: any, date: Date | undefined) => {
        date && props.onChanged(date)
        setShow(false);
    }, [])

    return (
        <React.Fragment>
            <TouchableOpacity onPress={() => setShow(true)}>
                <InputWrapper {...props} icon={"calendar"}>
                    <Text style={styles.input}>{format(props.value, "dd.MM.yyyy")}</Text>
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
