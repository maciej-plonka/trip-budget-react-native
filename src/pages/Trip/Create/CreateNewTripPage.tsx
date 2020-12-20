import React, {useState} from "react";
import {TripNavigationProps} from "../TripParamList";
import Page from "../../Page";
import {FormCalendarInput, FormCard, FormMoneyInput, FormTextInput} from "../../../components/Form";
import Center from "../../../components/Center/Center";
const dayLater = (date: Date): Date => {
    const newDate = new Date();
    newDate.setDate(date.getDate() + 1);
    return newDate;
}

const CreateNewTripPage: React.FC<TripNavigationProps<"CreateNewTripPage">> = ({navigation}) => {
    const [name, setName] = useState("New trip");
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(dayLater(startDate));
    const [totalBudget, setTotalBudget] = useState<number>(0)
    return (
        <Page title={"Create trip"}>
            <Center styles={{padding: 16}}>
                <FormCard>
                    <FormTextInput icon={"name"}label={"Name"} value={name} onChanged={setName} />
                    <FormCalendarInput label={"Start date"} value={startDate} onChanged={setStartDate} />
                    <FormCalendarInput label={"End date"} value={endDate} onChanged={setEndDate} />
                    <FormMoneyInput label={"Budget"} value={totalBudget} onChanged={setTotalBudget} />
                </FormCard>
            </Center>
        </Page>
    )
}


export default CreateNewTripPage;
