import {useEffect, useState} from "react";

export const useSelectedTab = (initialValue: string | null = null, onTabChanged?: (v: string | null) => void) => {
    const [selectedTab, setSelectedTab] = useState<string | null>(null)

    useEffect(() => {
        onTabChanged && onTabChanged(selectedTab)
    }, [selectedTab])

    const isActive = (tab: string) => selectedTab === tab
    const selectTab = (tab: string | null) => setSelectedTab(tab)

    return {isActive, selectTab}
}
