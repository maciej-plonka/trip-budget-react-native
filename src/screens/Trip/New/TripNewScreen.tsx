import React from "react";
import {
    Button,
    Center,
    FormButtonRow,
    FormCalendarInput,
    FormCard,
    FormImagePicker,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Screen,
    TextWhite
} from "../../../components";
import {TripNavigationProps} from "../../../navigation";
import {useTripNew} from "./TripNewHook";

export const TripNewScreen = ({navigation}: TripNavigationProps<"TripNewScreen">) => {
    const tripNew = useTripNew()
    const onSubmit = () => {
        tripNew.create();
        navigation.goBack();
    }
    const avatar = <FormImagePicker value={tripNew.image} onChanged={tripNew.setImage} imageRatio={[2,1]}/>;
    return (
        <Screen>
            <Screen.Header title={"New trip"}/>
            <Screen.Content>
                <Center style={{padding: 16}}>
                    <FormCard avatar={avatar}>
                        <FormTextInput icon={"notes"} label={"Name"} value={tripNew.name} onChanged={tripNew.setName}/>
                        <FormCalendarInput label={"Start date"} value={tripNew.startDate} onChanged={tripNew.setStartDate}/>
                        <FormCalendarInput label={"End date"} value={tripNew.endDate} onChanged={tripNew.setEndDate}/>
                        <FormMoneyInput label={"Budget"} value={tripNew.totalBudget} onChanged={tripNew.setTotalBudget}
                                        currencyEditable/>
                        <FormButtonRow right>
                            <Button onClick={onSubmit} color={"primary"}>
                                <Icon iconType={"confirm"} size={19} />
                                <TextWhite>Create</TextWhite>
                            </Button>
                        </FormButtonRow>
                    </FormCard>
                </Center>
            </Screen.Content>
        </Screen>
    )
}
