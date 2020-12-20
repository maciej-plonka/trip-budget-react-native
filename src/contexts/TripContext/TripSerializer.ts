import {Trip} from "./Trip";
import {Serializer} from "../../hooks/AsyncStorageState";

type SerializedTrip = {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    totalBudget: number
}


const TripSerializer: Serializer<Trip[]> = {
    fromJson(json: string): Trip[] {
        const array = JSON.parse(json) as SerializedTrip[]
        return array.map(it => ({...it,
            startDate: new Date(it.startDate),
            endDate: new Date(it.endDate)
        }))
    },

    toJson(value: Trip[]): string {
        return JSON.stringify(value);
    }
}

export default TripSerializer;
