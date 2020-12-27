import React, {createContext, useContext} from "react";
import {Budget, BudgetAction, useBudgetReducer} from "../../domain/Budget";
import {AsyncDispatch} from "../../hooks/AsyncStorageReducer";

const BudgetsContext = createContext<Readonly<Budget[]>>([])
export const useBudgetsContext = () => useContext(BudgetsContext)
const BudgetsDispatcherContext = createContext<AsyncDispatch<BudgetAction>>(() => Promise.resolve());
export const useBudgetsDispatcherContext = () => useContext(BudgetsDispatcherContext)
export const useBudgetByTripId = (tripId: number) => useBudgetsContext().find(it => it.tripId === tripId);
type Props = {
    children?: React.ReactNode
}
export const BudgetsProvider = ({children}: Props) => {
    const [value, dispatcher] = useBudgetReducer()
    return (
        <BudgetsContext.Provider value={value}>
            <BudgetsDispatcherContext.Provider value={dispatcher}>
                {children}
            </BudgetsDispatcherContext.Provider>
        </BudgetsContext.Provider>
    )
}

