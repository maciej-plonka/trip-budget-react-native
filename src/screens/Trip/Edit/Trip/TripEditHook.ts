import {useDispatch, useSelector} from "react-redux";
import {selectTripById} from "../../../../store/selectors";
import {useMemo} from "react";
import {Id} from "../../../../store";
import {deleteTrip, updateTrip} from "../../../../store/actions/TripActions";
import {availableCurrencies, defaultMoney, Money} from "../../../../models";
import {Trip} from "../../../../store/models";
import * as yup from "yup"
import {addDays, startOfTomorrow} from "date-fns";

export type TripEditValues = {
    name: string,
    startDate: Date,
    endDate: Date,
    image: string | undefined,
    totalBudget: Money
}

const createInitialValues = (trip?: Trip):TripEditValues => ({
    name: trip?.name ?? "",
    startDate: trip?.startDate ?? new Date(),
    endDate: trip?.endDate ?? new Date(),
    image: trip?.image,
    totalBudget: trip?.totalBudget ?? defaultMoney()
})


export const useTripEdit = (tripId: Id) => {
    const trip = useSelector(selectTripById(tripId))
    const dispatch = useDispatch()
    const initialValues = useMemo(() => createInitialValues(trip), [])
    const update = (values: TripEditValues) => {
        const updatedTrip: Trip = {
            id: tripId,
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
            totalBudget: values.totalBudget,
            image: values.image
        }
        dispatch(updateTrip(updatedTrip));
    }
    const remove = () => dispatch(deleteTrip(tripId))
    return {
        initialValues,
        exists: !!trip,
        update, remove
    }
}
