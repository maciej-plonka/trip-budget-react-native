import React, {useCallback} from "react";
import Page from "../../Page";
import {TripNavigationProps} from "../TripParamList";
import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import Center from "../../../components/Center/Center";
import { useTripContext} from "../../../contexts/TripContext";
import TripCard from "./TripCard";
import {Trip} from "../../../domain/Trip";

const keyExtractor = ({id}: { id: number }) => id.toString()
const TripHomePage: React.FC<TripNavigationProps<"HomePage">> = ({navigation}) => {
    const trips = useTripContext()
    const onFabPress = useCallback(() => navigation.push("CreateNewTripPage"), []);
    const renderItem = useCallback(({item}: { item: Trip }) => (
        <TouchableOpacity onLongPress={() => navigation.push("UpdateTripPage", {tripId: item.id})}>
            <TripCard trip={item}/>
        </TouchableOpacity>
    ), []);
    const Content = !trips.length
        ? <Text>No trip yet :)</Text>
        : <FlatList style={styles.list} data={trips} keyExtractor={keyExtractor} renderItem={renderItem}/>
    return (
        <Page title={"Trip Planner"} fab={{onPress: onFabPress, position: "right"}}>
            <Center>
                {Content}
            </Center>
        </Page>
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    }
})

export default TripHomePage;
