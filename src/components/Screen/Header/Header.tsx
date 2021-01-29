import React, {FC, ReactElement, useEffect, useState} from "react";
import {HeaderCtx} from "./HeaderContext";
import {HeaderTab, HeaderTabProps} from "./HeaderTab";
import {StyleSheet, View} from "react-native";
import {Color, isGradient} from "../../../models/Colors";
import {ColoredBackground} from "../../ColoredBackground";
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



const backgroundStyles = (backgroundColor: Color) => [
    styles.container,
    isGradient(backgroundColor) && styles.containerLeft
]

const useSelectedTab = (initialValue: string | null = null, onTabChanged?: (v: string | null) => void) => {
    const [selectedTab, setSelectedTab] = useState<string | null>(null)

    useEffect(() => {
        onTabChanged && onTabChanged(selectedTab)
    }, [selectedTab])

    return {
        isActive:(tab: string) => selectedTab === tab ,
        selectTab: (tab: string | null) => setSelectedTab(tab)
    }
}

export const Header: FC<HeaderProps> & IComposition = ({children, onTabChanged, color = "white", title}) => {
    const selectedTab = useSelectedTab(null, onTabChanged)
    const hasTabs = !!children
    return (
        <HeaderCtx.Provider value={{...selectedTab, color}}>
            <ColoredBackground style={backgroundStyles(color)} color={color}>
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
