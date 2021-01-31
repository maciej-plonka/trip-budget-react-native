import {useDispatch, useSelector} from "react-redux";
import {selectTripById} from "../../../../store/selectors";
import {useState} from "react";
import {Id} from "../../../../store";
import {deleteTrip, updateTrip} from "../../../../store/actions/TripActions";
import {defaultMoney, Money} from "../../../../models/Money";

type TripEdit = {
    name: string,
    setName(name: string): void
    startDate: Date,
    setStartDate(startDate: Date): void
    endDate: Date,
    setEndDate(endDate: Date): void,
    image: string | undefined
    setImage(image: string | undefined):void,
    totalBudget: Money,
    setTotalBudget(totalBudget: Money): void,
    update(): void,
    remove(): void,
}

export const useTripEdit = (tripId: Id): TripEdit | undefined => {
    const trip = useSelector(selectTripById(tripId))
    const dispatch = useDispatch()
    const [name, setName] = useState(trip?.name ?? "")
    const [startDate, setStartDate] = useState<Date>(trip?.startDate ?? new Date())
    const [endDate, setEndDate] = useState<Date>(trip?.endDate ?? new Date())
    const [image, setImage] = useState<string | undefined>(trip?.image)
    const [totalBudget, setTotalBudget] = useState<Money>(trip?.totalBudget ?? defaultMoney())
    if (!trip) {
        return;
    }
    const update = () => dispatch(updateTrip({...trip, name, startDate, endDate, totalBudget, image}))
    const remove = () => dispatch(deleteTrip(tripId))
    return {
        name, setName,
        startDate, setStartDate,
        endDate, setEndDate,
        image, setImage,
        totalBudget, setTotalBudget,
        update, remove
    }
}
