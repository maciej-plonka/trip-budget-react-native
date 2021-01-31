import {defaultMoney, Money} from "../../../models/Money";
import {useState} from "react";
import {addDays, startOfDay} from "date-fns";
import {useDispatch} from "react-redux";
import {createTrip} from "../../../store/actions/TripActions";

type TripNew = {
    name: string,
    setName(name: string): void,
    startDate: Date,
    setStartDate(startDate: Date): void,
    endDate: Date,
    setEndDate(endDate: Date): void,
    totalBudget: Money,
    setTotalBudget(totalBudget: Money): void,
    image: string | undefined
    setImage(image: string | undefined):void,
    create(): void,
}

export const useTripNew = (): TripNew => {
    const [name, setName] = useState("New trip");
    const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()))
    const [endDate, setEndDate] = useState<Date>(addDays(startDate, 1));
    const [totalBudget, setTotalBudget] = useState<Money>(defaultMoney())
    const [image, setImage] = useState<string | undefined>()
    const dispatch = useDispatch()
    const create = () => dispatch(createTrip({ name,startDate, endDate,totalBudget, image}))
    return {
        name, setName,
        startDate, setStartDate,
        endDate, setEndDate,
        totalBudget, setTotalBudget,
        image, setImage,
        create,
    }
}
