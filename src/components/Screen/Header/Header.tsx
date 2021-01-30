import React, {FC, ReactElement} from "react";
import {HeaderProvider} from "./HeaderContext";
import {HeaderTab, HeaderTabProps} from "./HeaderTab";
import {StyleSheet, View} from "react-native";
import {Color, isGradient} from "../../../models/Colors";
import {ColoredBackground} from "../../ColoredBackground";
import {HeaderTitle} from "./HeaderTitle";
import {HeaderColor, useHeaderColor} from "../../../contexts/ThemeContext";
import {useSelectedTab} from "./HeaderHook";

export type HeaderProps = {
    children?: Array<ReactElement<HeaderTabProps>> | ReactElement<HeaderTabProps>,
    color?: HeaderColor,
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


export const Header: FC<HeaderProps> & IComposition = ({children, onTabChanged, color = "trip", title}) => {
    const headerColor = useHeaderColor(color)
    const selectedTab = useSelectedTab(null, onTabChanged)
    return (
        <HeaderProvider value={{...selectedTab, color: headerColor}}>
            <ColoredBackground style={backgroundStyles(headerColor)} color={headerColor}>
                <HeaderTitle title={title} color={headerColor}/>
                {children && (
                    <View style={styles.childrenList}>
                        {children}
                    </View>
                )}
            </ColoredBackground>
        </HeaderProvider>
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
