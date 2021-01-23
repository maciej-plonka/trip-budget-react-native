import React, {FC, ReactElement, useEffect, useState} from "react";
import {HeaderCtx} from "./HeaderContext";
import {HeaderTab, HeaderTabProps} from "./HeaderTab";
import {StyleSheet, Text, View} from "react-native";
import {Color, isGradient} from "../../../models/Colors";
import ColoredBackground from "../../ColoredBackground";
import {HeaderTitle} from "./HeaderTitle";

export type HeaderProps = {
    children?: Array<ReactElement<HeaderTabProps>> | ReactElement<HeaderTabProps>,
    color?: Color,
    title: string,
    onTabChanged?: (tab: string | null) => void
}

interface IComposition {
    Tab: typeof HeaderTab
}



const backgroundStyles = (backgroundColor: Color, hasTabs: boolean = false) => [
    styles.container,
    {height: hasTabs ? 124 : 82},
    isGradient(backgroundColor) && styles.containerLeft
]

const useSelectedTab = (initialValue: string | null = null, onTabChanged?: (v: string | null) => void) => {
    const [selectedTab, setSelectedTab] = useState<string | null>(null)

    useEffect(() => {
        onTabChanged && onTabChanged(selectedTab)
    }, [selectedTab])

    return {
        currentTab: selectedTab,
        selectTab: (tab: string | null) => setSelectedTab(tab)
    }
}

export const Header: FC<HeaderProps> & IComposition = ({children, onTabChanged, color = "white", title}) => {
    const providerValue = useSelectedTab(null, onTabChanged)
    const hasTabs = !!children
    return (
        <HeaderCtx.Provider value={providerValue}>
            <ColoredBackground style={backgroundStyles(color, hasTabs)} color={color}>
                <HeaderTitle title={title} color={color} />
                {hasTabs && (
                    <View style={styles.childrenList}>
                        {children}
                    </View>
                )}
            </ColoredBackground>
        </HeaderCtx.Provider>
    )
}

Header.Tab = HeaderTab

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
    },

    containerLeft: {
        alignItems: "flex-start"
    },
    childrenList: {
        display: "flex",
        flexDirection: "row"
    },

})
