import {RootState} from "../reducers";
import {filterBy, findBy} from "../../utils/Collections";

export const selectAllWishesByTripId = (tripId: number) => (state: RootState) => filterBy(state.wish.wishes,"tripId", tripId)
export const selectWishById = (id: number) => (state: RootState) => findBy(state.wish.wishes, "id",id)
