import React, {useContext} from "react";
import {createContext} from "react";
import {TripAction, Trip, TripReducer, TripSerializer} from "../../domain/Trip";
import {AsyncDispatch, useAsyncStorageReducer} from "../../hooks/AsyncStorageReducer";

const TripContext = createContext<Readonly<Trip[]>>([])
export const useTripContext = () => useContext(TripContext);
const TripDispatchContext = createContext<AsyncDispatch<TripAction>>(() => Promise.resolve())
export const useTripDispatchContext = () => useContext(TripDispatchContext);

type Props = {
    children?: React.ReactNode
}
export const TripsProvider = ({children}: Props) => {
    const [value, dispatcher] = useAsyncStorageReducer<Trip[], TripAction>("trips", TripReducer, [], TripSerializer);
    return (
        <TripContext.Provider value={value}>
            <TripDispatchContext.Provider value={dispatcher}>
                {children}
            </TripDispatchContext.Provider>
        </TripContext.Provider>
    )
}
