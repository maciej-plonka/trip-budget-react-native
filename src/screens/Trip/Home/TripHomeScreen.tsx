import React from "react";
import {FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {selectAllTrips} from "../../../store/selectors";
import {TripNavigationProps} from "../../../navigation";
import {TripListItem} from "./TripListItem";
import {Screen, Space} from "../../../components";
import {Trip} from "../../../store/models";

const keyExtractor = (trip: Trip): string => trip.id
export const TripHomeScreen = ({navigation}: TripNavigationProps<"TripHomeScreen">) => {
    const trips = useSelector(selectAllTrips())
    const navigateToNewTripScreen = () => navigation.push("TripNewScreen")
    const navigateToDetailsPage = (trip: Trip) => navigation.push("TripDetailsScreen", {tripId: trip.id})
    return (
        <Screen>
            <Screen.Header title={"Trip Home"}/>
            <Screen.Content>
                <FlatList
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    data={trips}
                    keyExtractor={keyExtractor}
                    renderItem={renderedItem => {
                        const last = renderedItem.index === trips.length - 1
                        return (
                            <>
                                <TouchableOpacity onPress={() => navigateToDetailsPage(renderedItem.item)}>
                                    <TripListItem item={renderedItem.item}/>
                                </TouchableOpacity>
                                {last && <Space direction={"vertical"} size={64}/>}
                            </>
                        )
                    }}/>
            </Screen.Content>
            <Screen.Fab onClick={navigateToNewTripScreen}/>
        </Screen>
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    }
})
