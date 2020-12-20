import React from "react";
import Page from "../../Page";
import TripCard from "./TripCard";
import {FlatList} from "react-native";
import {TripNavigationProps} from "../TripParamList";

const data = [
    {key: "1"},
    {key: "2"},
    {key: "3"},
    {key: "4"},
    {key: "5"},
    {key: "6"},
]

const TripHomePage: React.FC<TripNavigationProps<"HomePage">> = ({navigation}) => {
    const onFabPress = () => navigation.push("CreateNewTripPage");
    return (
        <Page title={"Trip Planner"} fab={{onPress: onFabPress, onRight: true}}>
            <FlatList style={{padding: 16}}  data={data} renderItem={() => <TripCard/>}/>
        </Page>
    )
}

export default TripHomePage;
