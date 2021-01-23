import {Money} from "../../../models/Money";
import {useState} from "react";
import {addDays, startOfDay} from "date-fns";
import {useDispatch} from "react-redux";
import {createFullTrip} from "../../../store/actions";

type TripNew = {
    name: string,
    setName(name: string): void,
    startDate: Date,
    setStartDate(startDate: Date): void,
    endDate: Date,
    setEndDate(endDate: Date): void,
    totalBudget: Money,
    setTotalBudget(totalBudget: Money): void,
    create(): void,
}

export const useTripNew = (): TripNew => {
    const [name, setName] = useState("New trip");
    const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()))
    const [endDate, setEndDate] = useState<Date>(addDays(startDate, 1));
    const [totalBudget, setTotalBudget] = useState<Money>({amount: 0, currency: "¥"})
    const dispatch = useDispatch()

    const create = () => {
        const trip = {
            name,
            startDate,
            endDate,
            totalBudget
        }
        dispatch(createFullTrip(trip))
    }
    return {
        name, setName,
        startDate, setStartDate,
        endDate, setEndDate,
        totalBudget, setTotalBudget,
        create,
    }
}
