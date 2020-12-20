import React from "react"
import {TripsContext} from "./TripsContext";
import {Serializer, useAsyncStorageState} from "../../hooks/AsyncStorageState";
import {TripsDispatch, TripsDispatchContext} from "./TripsDispatchContext";
import {NewTrip, Trip} from "./Trip";


type Props = {
    children?: React.ReactNode
}

type SerializedTrip = {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    totalBudget: number
}

const tripSerializer: Serializer<Trip[]> = {
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

const TripsProvider = ({children}: Props) => {
    const [trips, updateTrips] = useAsyncStorageState<Trip[]>("trips", [], tripSerializer);
    const dispatch: TripsDispatch = {
        addTrip: async (newTrip: NewTrip): Promise<void> => {
            const lastId = trips.map(t => t.id).reduce((a, b) => a > b ? a : b, 0);
            const trip = {...newTrip, id: lastId + 1}
            await updateTrips(previous => [...previous, trip])
        },
        removeTripById(tripId: number): Promise<Trip | undefined> {
            return Promise.resolve(undefined);
        }

    }
    return (
        <TripsContext.Provider value={trips}>
            <TripsDispatchContext.Provider value={dispatch}>
                {children}
            </TripsDispatchContext.Provider>
        </TripsContext.Provider>
    )
}

export default TripsProvider;
