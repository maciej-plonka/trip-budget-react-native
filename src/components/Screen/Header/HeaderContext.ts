import React from "react";
type HeaderCtxType = {
    currentTab: string | null,
    selectTab: (tab: string) => void
}

const initialCtxValue: HeaderCtxType = {
    currentTab: null,
    selectTab(tab: string): void {
    }
}
export const HeaderCtx = React.createContext<HeaderCtxType>(initialCtxValue)
