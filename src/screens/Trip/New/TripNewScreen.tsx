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
import {useTripNew} from "./TripNewHook";
import {Screen} from "../../../components/Screen";

export const TripNewScreen = ({navigation}: TripNavigationProps<"TripNewScreen">) => {
    const tripNew = useTripNew()
    const onSubmit = () => {
        tripNew.create();
        navigation.goBack();
    }
    return (
        <Screen>
            <Screen.Header title={"New trip"}/>
            <Screen.Content>
                <Center styles={{padding: 16}}>
                    <FormCard>
                        <FormTextInput icon={"name"} label={"Name"} value={tripNew.name} onChanged={tripNew.setName}/>
                        <FormCalendarInput label={"Start date"} value={tripNew.startDate} onChanged={tripNew.setStartDate}/>
                        <FormCalendarInput label={"End date"} value={tripNew.endDate} onChanged={tripNew.setEndDate}/>
                        <FormMoneyInput label={"Budget"} value={tripNew.totalBudget} onChanged={tripNew.setTotalBudget}
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
