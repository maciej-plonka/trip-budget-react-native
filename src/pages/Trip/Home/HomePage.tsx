import React from "react";
import Page from "../../Page";
import {TripNavigationProps} from "../TripParamList";
import {FlatList, StyleSheet, Text} from "react-native";
import Center from "../../../components/Center/Center";
import {useTripsContext} from "../../../contexts/TripContext";
import TripCard from "./TripCard";

const TripHomePage: React.FC<TripNavigationProps<"HomePage">> = ({navigation}) => {
    const onFabPress = () => navigation.push("CreateNewTripPage");
    const trips = useTripsContext();

    return (
        <Page title={"Trip Planner"} fab={{onPress: onFabPress, onRight: true}}>
            <Center styles={styles.root}>
                {!trips.length && <Text>No trip yet :)</Text>}
                {!!trips.length && <FlatList style={styles.list}
                                            data={trips}
                                             keyExtractor={i => i.id.toString()}
                                             renderItem={it => <TripCard trip={it.item} />}
                />}
            </Center>

        </Page>
    )
}

const styles = StyleSheet.create({
    root: {

    },
    list: {
        padding: 16,
    }
})

export default TripHomePage;
