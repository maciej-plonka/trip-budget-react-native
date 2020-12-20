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
    children?: Array<JSX.Element | undefined> | JSX.Element
}

const createInitialState = (tabs: Tab[]) => {
    if (!tabs.length) return {tabs}
    return {tabs, selected: tabs[0]}
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


