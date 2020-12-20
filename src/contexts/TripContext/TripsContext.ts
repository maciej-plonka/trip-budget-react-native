import {createContext, useContext} from "react";
import {Trip} from "./Trip";

export const TripsContext = createContext<Readonly<Trip[]>>([])
export const useTripsContext = () => useContext(TripsContext);
