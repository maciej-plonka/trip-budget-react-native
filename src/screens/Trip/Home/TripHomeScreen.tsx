import React from "react";
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import {selectAllTrips} from "../../../store/selectors";
import {TripNavigationProps} from "../../../navigation";
import {TripListItem} from "./TripListItem";
import {Screen} from "../../../components";
import {Trip} from "../../../store/states";

type PotentialTrip = Trip | null
const keyExtractor = (trip: PotentialTrip) => !trip ? "-1" : trip.id.toString();

export const TripHomeScreen = ({navigation}: TripNavigationProps<"TripHomeScreen">) => {
    const trips = useSelector(selectAllTrips)
    const navigateToNewTripScreen = () => navigation.push("TripNewScreen")
    return (
        <Screen>
            <Screen.Header title={"Trip Home"} />
            <Screen.Content>
                <FlatList style={styles.list}
                          data={[...trips, null]}
                          keyExtractor={keyExtractor}
                          renderItem={({item}) => (<TripListItem item={item} />)}/>
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
