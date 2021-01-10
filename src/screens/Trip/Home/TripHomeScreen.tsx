import React, {useCallback} from "react";
import {Screen} from "../../Screen";
import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Center} from "../../../components/Center";
import TripCard from "./TripCard";
import {Trip} from "../../../store/states";
import {useSelector} from "react-redux";
import {selectAllTrips} from "../../../store/selectors";
import {TripNavigationProps} from "../../../navigation";

const keyExtractor = ({id}: { id: number }) => id.toString()

export const TripHomeScreen: React.FC<TripNavigationProps<"HomeScreen">> = ({navigation}) => {
    const trips = useSelector(selectAllTrips)
    const renderItem = useCallback(({item}: { item: Trip }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Modules", {
                screen: "ShoppingList",
                params: {
                    screen: "HomeScreen",
                    params: {tripId: item.id}
                }
            })}
            onLongPress={() => navigation.push("TripDetailsScreen", {tripId: item.id})}
            delayLongPress={200}>
            <TripCard trip={item}/>
        </TouchableOpacity>
    ), []);
    return (
        <Screen title={"Trip Planner"} fab={{onPress: () => navigation.push("CreateNewTripScreen")}}>
            <Center>
                {trips.length
                    ? (<FlatList style={styles.list} data={trips} keyExtractor={keyExtractor} renderItem={renderItem}/>)
                    : (<Text>No trip yet :)</Text>)
                }
            </Center>
        </Screen>
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    }
})
