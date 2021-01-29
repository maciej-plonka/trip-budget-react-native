import React from "react";
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import {selectAllTrips} from "../../../store/selectors";
import {TripNavigationProps} from "../../../navigation";
import {TripListItem} from "./TripListItem";
import {Screen} from "../../../components";

const keyExtractor = ({id}: { id: number }) => id.toString()

export const TripHomeScreen = ({navigation}: TripNavigationProps<"TripHomeScreen">) => {
    const trips = useSelector(selectAllTrips)
    const navigateToNewTripScreen = () => navigation.push("TripNewScreen")
    return (
        <Screen>
            <Screen.Header title={"Trip Home"} />
            <Screen.Content>
                <FlatList style={styles.list}
                          data={trips}
                          keyExtractor={keyExtractor}
                          renderItem={item => (<TripListItem {...item}/>)}/>
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
