import {useDispatch, useSelector} from "react-redux";
import {selectTripById} from "../../../../store/selectors";
import {useState} from "react";
import {Trip} from "../../../../store/states";
import {deleteFullTrip, updateTrip} from "../../../../store/actions";

type TripEdit = {
    name: string,
    setName(name: string): void
    startDate: Date,
    setStartDate(startDate: Date): void
    endDate: Date,
    setEndDate(endDate: Date): void,
    update(): void,
    remove(): void,
}

export const useTripEdit = (tripId: number): TripEdit | undefined => {
    const trip = useSelector(selectTripById(tripId))
    if(!trip){
        return;
    }
    const dispatch = useDispatch()
    const [name, setName] = useState(trip?.name ?? "")
    const [startDate, setStartDate] = useState<Date>(trip?.startDate ?? new Date())
    const [endDate, setEndDate] = useState<Date>(trip?.endDate ?? new Date())

    const update = () => {
        const tripToUpdate: Trip = {id: tripId, name, startDate, endDate}
        dispatch(updateTrip(tripToUpdate))
    }

    const remove = () => deleteFullTrip(tripId)

    return {
        name, setName,
        startDate, setStartDate,
        endDate, setEndDate,
        update, remove
    }
}
