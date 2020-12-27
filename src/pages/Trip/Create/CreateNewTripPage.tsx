import React, {useState} from "react";
import {TripNavigationProps} from "../TripParamList";
import Page from "../../Page";
import {
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormCreateButton,
    FormMoneyInput,
    FormTextInput
} from "../../../components/Form";
import Center from "../../../components/Center/Center";
import {useTripContext, useTripDispatchContext} from "../../../contexts/TripContext";
import {useBudgetsDispatcherContext} from "../../../contexts/BudgetsContext";

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

    const tripDispatch = useTripDispatchContext();
    const budgetDispatch = useBudgetsDispatcherContext()
    const tripId = useTripContext().map(it => it.id).reduce((a, b) => a > b ? a : b, 0) + 1
    const onSubmit = async () => {
        const newTrip = {id: tripId,name, startDate, endDate, totalBudget}
        try {
            await tripDispatch({type: "create", newTrip})
            const budgetAsMoney = {amount: totalBudget, currency: "¥"} as Money
            const newBudget = {tripId, value: budgetAsMoney};
            await budgetDispatch({type: "create", newBudget})
            navigation.goBack();
        } catch(e) {
            console.error(`Error while creating trip: ${JSON.stringify(newTrip)}`, e);
        }
    }
    return (
        <Page title={"Create trip"}>
            <Center styles={{padding: 16}}>
                <FormCard>
                    <FormTextInput icon={"name"} label={"Name"} value={name} onChanged={setName}/>
                    <FormCalendarInput label={"Start date"} value={startDate} onChanged={setStartDate}/>
                    <FormCalendarInput label={"End date"} value={endDate} onChanged={setEndDate}/>
                    <FormMoneyInput label={"Budget"} value={totalBudget} onChanged={setTotalBudget}/>
                    <FormButtonRow right>
                        <FormCreateButton onClick={onSubmit}/>
                    </FormButtonRow>
                </FormCard>
            </Center>
        </Page>
    )
}


export default CreateNewTripPage;
