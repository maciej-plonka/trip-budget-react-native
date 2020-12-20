import React from "react";
import Tab from "./Tab";

type ReducerState = { tabs: Tab[], selected?: Tab }
type ReducerAction = { type: 'select', tab: Tab }

const selectedTabReducer = (state: ReducerState, action: ReducerAction): ReducerState => {
    switch (action.type) {
        case "select":
            if (state.tabs.some(tab => tab === action.tab)) {
                return {...state, selected: action.tab};
            }
            break;
    }
    return state;
}
export type TabsDispatcher = React.Dispatch<ReducerAction>
export default selectedTabReducer;
