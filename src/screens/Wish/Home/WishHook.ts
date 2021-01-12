import {useSelector} from "react-redux";
import {selectAllWishesByTripId} from "../../../store/selectors";
import {Wish} from "../../../store/states";

export const useWishesByTripId = (tripId: number): Readonly<Wish[]> => {
    return useSelector(selectAllWishesByTripId(tripId))
}
