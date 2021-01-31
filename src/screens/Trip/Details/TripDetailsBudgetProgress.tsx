import React from "react";
import {useSelector} from "react-redux";
import {Card, MoneyLinearProgressBar} from "../../../components";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {usePrimaryColor} from "../../../contexts/ThemeContext";
import {sumCategoriesBudget, Trip} from "../../../store/models";
import {selectBudgetCategoriesByTripId} from "../../../store/selectors";

type Props = {
    trip: Trip
    label?: string,
    onPress?: () => void
}

export const TripDetailsBudgetProgress = ({trip, label = "Budget", onPress}: Props) => {
    const categories = useSelector(selectBudgetCategoriesByTripId(trip.id))
    const color = usePrimaryColor()
    const currentlySpent = sumCategoriesBudget(categories)
    return (
        <TouchableOpacity onLongPress={onPress} delayLongPress={200}>
            <Card style={styles.root}>
                {label && <Text style={styles.label}>{label}</Text>}
               <MoneyLinearProgressBar color={color} current={currentlySpent} max={trip.totalBudget} />
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        flexDirection: "column",
        padding: 16,
    },
    label: {
        marginBottom: 4,
    }
});
