import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {createTrip} from "../../../store/actions/TripActions";
import {NewTrip} from "../../../store/models";

export type TripNewValues = {
    name: string,
    startDate: Date,
    endDate: Date,
    image: string | undefined
}


const createInitialValues = ():TripNewValues => ({
    name: "",
    startDate:  new Date(),
    endDate:  new Date(),
    image: undefined,
})

export const useTripNew = () => {
    const dispatch = useDispatch()
    const initialValues = useMemo(() => createInitialValues(), [])
    const create = (values: TripNewValues) => {
        const newTrip: NewTrip = {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
            image: values.image,
        }

        dispatch(createTrip(newTrip));
    }
    return {
        create,initialValues
    }
}
