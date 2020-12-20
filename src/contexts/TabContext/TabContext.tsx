import React, {createContext, useContext, useReducer} from "react";
import Tab from "./Tab";
import selectedTabReducer, {TabsDispatcher} from "./selectedTabsReducer";


interface TabContextModel {
    tabs: Tab[],
    selected?: Tab
}

const TabContext = createContext<TabContextModel>({tabs: []})
const TabDispatchContext = createContext<TabsDispatcher>(() => {
})

export const useTabContext = () => useContext(TabContext);
export const useTabDispatchContext = () => useContext(TabDispatchContext);


interface Props {
    initialTabs?: Tab[],
    children?: React.ReactNode
}

const createInitialState = (tabs: Tab[]) => {
    return tabs.length ? {tabs, selected: tabs[0]} : {tabs}
}
export default function Tabs({initialTabs = [], children}: Props) {
    const [tabs, dispatcher] = useReducer(selectedTabReducer, createInitialState(initialTabs))
    return (
        <TabContext.Provider value={tabs}>
            <TabDispatchContext.Provider value={dispatcher}>
                {children}
            </TabDispatchContext.Provider>
        </TabContext.Provider>
    )
}


