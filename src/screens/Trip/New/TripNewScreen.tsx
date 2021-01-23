import React from "react";
import {
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormCreateButton,
    FormMoneyInput,
    FormTextInput
} from "../../../components/Form";
import {Center} from "../../../components/Center";
import {TripNavigationProps} from "../../../navigation";
import {useNewTrip} from "./NewTripHook";
import {Screen} from "../../../components/Screen";

export const TripNewScreen = ({navigation}: TripNavigationProps<"TripNewScreen">) => {
    const trip = useNewTrip()
    const onSubmit = () => {
        trip.create();
        navigation.goBack();
    }
    return (
        <Screen>
            <Screen.Header title={"New trip"}/>
            <Screen.Content>
                <Center styles={{padding: 16}}>
                    <FormCard>
                        <FormTextInput icon={"name"} label={"Name"} value={trip.name} onChanged={trip.setName}/>
                        <FormCalendarInput label={"Start date"} value={trip.startDate} onChanged={trip.setStartDate}/>
                        <FormCalendarInput label={"End date"} value={trip.endDate} onChanged={trip.setEndDate}/>
                        <FormMoneyInput label={"Budget"} value={trip.totalBudget} onChanged={trip.setTotalBudget}
                                        currencyEditable/>
                        <FormButtonRow right>
                            <FormCreateButton onClick={onSubmit}/>
                        </FormButtonRow>
                    </FormCard>
                </Center>
            </Screen.Content>
        </Screen>
    )
}
