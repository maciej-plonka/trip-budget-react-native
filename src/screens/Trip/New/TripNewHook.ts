import {availableCurrencies, defaultMoney, Money} from "../../../models/Money";
import {useMemo, useState} from "react";
import {addDays, startOfDay, startOfTomorrow} from "date-fns";
import {useDispatch} from "react-redux";
import {createTrip} from "../../../store/actions/TripActions";
import * as yup from "yup";
import {NewTrip, Trip} from "../../../store/models";
import {TripEditValues} from "../Edit/Trip/TripEditHook";

export type TripNewValues = {
    name: string,
    startDate: Date,
    endDate: Date,
    totalBudget: Money
    image: string | undefined
}


const createInitialValues = ():TripNewValues => ({
    name: "",
    startDate:  new Date(),
    endDate:  new Date(),
    image: undefined,
    totalBudget: defaultMoney()
})

export const useTripNew = () => {
    const dispatch = useDispatch()
    const initialValues = useMemo(() => createInitialValues(), [])
    const create = (values: TripNewValues) => {
        const newTrip:NewTrip = {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
            image: values.image,
            totalBudget: values.totalBudget
        }

        dispatch(createTrip(newTrip));
    }
    return {
        create,initialValues
    }
}
