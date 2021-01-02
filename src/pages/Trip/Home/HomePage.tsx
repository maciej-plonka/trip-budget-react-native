import React, {useCallback} from "react";
import Page from "../../Page";
import {TripNavigationProps} from "../TripParamList";
import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import Center from "../../../components/Center/Center";
import TripCard from "./TripCard";
import {Trip} from "../../../store/states";
import {useSelector} from "react-redux";
import {selectAllTrips} from "../../../store/selectors";

const keyExtractor = ({id}: { id: number }) => id.toString()
const TripHomePage: React.FC<TripNavigationProps<"HomePage">> = ({navigation}) => {
    const trips = useSelector(selectAllTrips)
    const onFabPress = useCallback(() => navigation.push("CreateNewTripPage"), []);
    const renderItem = useCallback(({item}: { item: Trip }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Modules", {
                screen: "ShoppingList",
                params: {
                    screen: "HomePage",
                    params: {tripId: item.id}
                }
            })}
            onLongPress={() => navigation.push("TripDetailsPage", {tripId: item.id})}
            delayLongPress={200}>
            <TripCard trip={item}/>
        </TouchableOpacity>
    ), []);
    return (
        <Page title={"Trip Planner"} fab={{onPress: onFabPress, position: "right"}}>
            <Center>
                {trips.length
                    ? (<FlatList style={styles.list} data={trips} keyExtractor={keyExtractor} renderItem={renderItem}/>)
                    : (<Text>No trip yet :)</Text>)
                }
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
