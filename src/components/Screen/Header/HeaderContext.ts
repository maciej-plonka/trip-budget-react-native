import React, {useContext} from "react";
import {Color} from "../../../models/Colors";

type HeaderCtxType = {
    isActive(tab: string):boolean
    color: Color,
    selectTab: (tab: string) => void
}

const initialCtxValue: HeaderCtxType = {
    isActive(tab: string): boolean {
        return false
    },
    color: "white",
    selectTab(tab: string): void {
    }
}
export const HeaderCtx = React.createContext<HeaderCtxType>(initialCtxValue)

export const useHeaderCtx = () => useContext(HeaderCtx)
