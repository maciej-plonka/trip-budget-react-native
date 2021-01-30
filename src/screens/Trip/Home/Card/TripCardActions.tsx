import React from "react";
import {Trip} from "../../../../store/states";
import {FormConfigureButton} from "../../../../components";
import {useNavigation} from "@react-navigation/native";
import {TripNavigation} from "../../../../navigation/Trip";
type Props = {
    trip: Trip
}
export const TripCardActions = ({trip}:Props) => {
    const navigation = useNavigation<TripNavigation<"TripHomeScreen">>()
    const navigateToDetails = () => navigation.navigate("TripDetailsScreen", {tripId: trip.id})
    return (
        <>
            <FormConfigureButton onClick={navigateToDetails} />
        </>
    )
}
