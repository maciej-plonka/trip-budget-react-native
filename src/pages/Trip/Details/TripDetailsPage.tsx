import React, {useEffect} from "react";
import {TripNavigationProps} from "../TripParamList";
import {Image, StyleSheet, Text, View} from "react-native"
import Page from "../../Page";
import Card from "../../../components/Card";
import {useSelector} from "react-redux";
import {selectBudgetByTripId, selectTripById} from "../../../store/selectors";
import BudgetProgress from "../../../components/BudgetProgress";
import {Budget} from "../../../store/states";
import {format} from "date-fns";
import {FormButtonRow, FormConfigureButton} from "../../../components/Form";

const calculateCurrentValue = ({categories, value}: Budget): Money => ({
    amount: categories.map(it => it.value.amount).reduce((a, b) => a + b, 0),
    currency: value.currency
})

const TripDetailsPage = ({navigation, route}: TripNavigationProps<"TripDetailsPage">) => {
    const tripId = route.params.tripId;
    const trip = useSelector(selectTripById(tripId))
    const budget = useSelector(selectBudgetByTripId(tripId))
    useEffect(() => {
        !trip && navigation.navigate("HomePage")
    }, [trip])
    return (
        <Page title={"Trip details"}>
            <View style={styles.root}>
                {trip ? (
                    <Card style={styles.detailsCard}>
                        <Image source={{uri: "http://unsplash.it/365/176"}} style={styles.image}/>
                        <View style={styles.description}>
                            <Text style={styles.title}>{trip.name}</Text>
                            <View style={styles.dates}>
                                <Text style={styles.date}>{format(trip.startDate, "dd.MM.yyyy")}</Text>
                                <Text style={styles.date}>{format(trip.endDate, "dd.MM.yyyy")}</Text>
                            </View>
                            <FormButtonRow right>
                                <FormConfigureButton onClick={() => navigation.push("UpdateTripPage", {tripId})}/>
                            </FormButtonRow>
                        </View>

                    </Card>
                ) : (<Text>Trip not found</Text>)}
                {budget ? (
                    <BudgetProgress
                        label={"Budget"}
                        onPress={() => navigation.push("UpdateTripBudgetPage", {tripId})}
                        maxValue={budget.value}
                        currentValue={calculateCurrentValue(budget)}/>
                ) : (<Text>No budget for this trip</Text>)}

            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 16,
        flexDirection: "column"
    },
    detailsCard: {
        flexDirection: "column"
    },

    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
    },

    description: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: "column"
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold"
    },

    dates: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 8
    },
    date: {
        fontSize: 12,
        color: "#B5B5B5"
    }
});

export default TripDetailsPage;
