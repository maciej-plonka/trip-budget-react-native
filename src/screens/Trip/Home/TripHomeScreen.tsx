import React from "react";
import {Screen} from "../../Screen";
import {FlatList, StyleSheet} from "react-native";
import {Center} from "../../../components/Center";
import {useSelector} from "react-redux";
import {selectAllTrips} from "../../../store/selectors";
import {TripNavigationProps} from "../../../navigation";
import {TripListItem} from "./TripListItem";


const keyExtractor = ({id}: { id: number }) => id.toString()

export const TripHomeScreen = ({navigation}: TripNavigationProps<"HomeScreen">) => {
    const trips = useSelector(selectAllTrips)
    const navigateToNewTripScreen = () => {
        navigation.push("CreateNewTripScreen")
    }

    return (
        <Screen title={"Trip Planner"} fab={{onPress: navigateToNewTripScreen}}>
            <Center>
                <FlatList style={styles.list}
                          data={trips}
                          keyExtractor={keyExtractor}
                          renderItem={item => (<TripListItem {...item}/>)}/>
            </Center>
        </Screen>
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    }
})
