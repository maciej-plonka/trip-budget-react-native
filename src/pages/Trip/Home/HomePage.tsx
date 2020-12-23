import React from "react";
import Page from "../../Page";
import {TripNavigationProps} from "../TripParamList";
import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import Center from "../../../components/Center/Center";
import {useTripsContext} from "../../../contexts/TripContext";
import TripCard from "./TripCard";

const TripHomePage: React.FC<TripNavigationProps<"HomePage">> = ({navigation}) => {
    const trips = useTripsContext();
    const onFabPress = () => navigation.push("CreateNewTripPage");
    const Content = !trips.length
        ? <Text>No trip yet :)</Text>
        : <FlatList style={styles.list} data={trips} keyExtractor={it => it.id.toString()}
                    renderItem={it => (
                        <TouchableOpacity
                            onLongPress={() => navigation.push("UpdateTripPage", {tripId: it.item.id})}>
                            <TripCard trip={it.item}/>
                        </TouchableOpacity>
                    )}/>
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
