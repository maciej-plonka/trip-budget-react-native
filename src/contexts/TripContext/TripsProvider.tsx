import React, {createContext, useContext} from "react";
import {Trip, TripAction, useTripReducer} from "../../domain/Trip";
import {AsyncDispatch} from "../../hooks/AsyncStorageReducer";

const TripContext = createContext<Readonly<Trip[]>>([])
export const useTripContext = () => useContext(TripContext);
const TripDispatchContext = createContext<AsyncDispatch<TripAction>>(() => Promise.resolve())
export const useTripDispatchContext = () => useContext(TripDispatchContext);

type Props = {
    children?: React.ReactNode
}
export const TripsProvider = ({children}: Props) => {
    const [value, dispatcher] = useTripReducer();
    return (
        <TripContext.Provider value={value}>
            <TripDispatchContext.Provider value={dispatcher}>
                {children}
            </TripDispatchContext.Provider>
        </TripContext.Provider>
    )
}
