import {Id} from "../../store";
import {useSelector} from "react-redux";
import {selectTripById} from "../../store/selectors";
import {useMemo} from "react";
import {Trip} from "../../store/models";
import {generateDayRange} from "../../models";

const sortDaysDesc = (left: Date, right: Date) => Math.sign(right.getTime() - left.getTime())

const generateDaysRangeForTrip = ({startDate, endDate}: Trip): ReadonlyArray<Date> =>
    [...generateDayRange(startDate, endDate)].sort(sortDaysDesc)

export const useTripDaysRange = (tripId: Id) => {
    const trip = useSelector(selectTripById(tripId))
    return useMemo(() => trip ? generateDaysRangeForTrip(trip) : [], [trip])
}

