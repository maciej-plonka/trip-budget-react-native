import React, {useState} from "react";
import {Screen} from "../../Screen";
import {
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormCreateButton,
    FormMoneyInput,
    FormTextInput
} from "../../../components/Form";
import {Center} from "../../../components/Center";
import {createFullTrip} from "../../../store/actions";
import {useDispatch} from "react-redux";
import {Money} from "../../../models/Money";
import {TripNavigationProps} from "../../../navigation";

const dayLater = (date: Date): Date => {
    const newDate = new Date();
    newDate.setDate(date.getDate() + 1);
    return newDate;
}

export const CreateNewTripScreen = ({navigation}: TripNavigationProps<"CreateNewTripScreen">) => {
    const [name, setName] = useState("New trip");
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(dayLater(startDate));
    const [totalBudget, setTotalBudget] = useState<Money>({amount: 0, currency: "¥"})

    const dispatch = useDispatch()
    const onSubmit = async () => {
        const fullTrip = {name, startDate, endDate, value: totalBudget}
        dispatch(createFullTrip(fullTrip))
        navigation.goBack();
    }
    return (
        <Screen title={"Create trip"}>
            <Center styles={{padding: 16}}>
                <FormCard>
                    <FormTextInput icon={"name"} label={"Name"} value={name} onChanged={setName}/>
                    <FormCalendarInput label={"Start date"} value={startDate} onChanged={setStartDate}/>
                    <FormCalendarInput label={"End date"} value={endDate} onChanged={setEndDate}/>
                    <FormMoneyInput label={"Budget"} value={totalBudget} onChanged={setTotalBudget} currencyEditable/>
                    <FormButtonRow right>
                        <FormCreateButton onClick={onSubmit}/>
                    </FormButtonRow>
                </FormCard>
            </Center>
        </Screen>
    )
}