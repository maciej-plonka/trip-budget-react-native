import React, {FC, ReactElement, useMemo} from "react";
import {HeaderProvider} from "./HeaderContext";
import {HeaderTab, HeaderTabProps} from "./HeaderTab";
import {Pressable, StyleSheet, View} from "react-native";
import {ColoredBackground} from "../../ColoredBackground";
import {HeaderTitle} from "./HeaderTitle";
import {HeaderColor, useHeaderColor} from "../../../contexts/ThemeContext";
import {useSelectedTab} from "./HeaderHook";
import {Column, Parent, Row} from "../../Blocks";
import {HeaderTabs} from "./HeaderTabs";
import {Icon} from "../../Icon";

type ChildrenType = Array<ReactElement<HeaderTabProps>> | ReactElement<HeaderTabProps>


export type HeaderProps = Parent<ChildrenType> & {
    color?: HeaderColor,
    title: string,
    onTabChanged?: (tab: string | null) => void,
    onConfiguration?: () => void,
}

interface IComposition {
    Tab: typeof HeaderTab
}

export const Header: FC<HeaderProps> & IComposition = (props) => {
    const {children, onConfiguration, onTabChanged, color = "trip", title} = props
    const headerColor = useHeaderColor(color)
    const selectedTab = useSelectedTab(null, onTabChanged)
    const height = useMemo(() => children ? 124 : 82, [children])
    return (
        <HeaderProvider value={{...selectedTab, color: headerColor}}>
            <ColoredBackground color={headerColor}>
                <Column style={{height}}>
                    <Row  flex={1} alignItems={"center"}  paddingHorizontal={16}>
                        <HeaderTitle title={title} color={headerColor}/>
                        {onConfiguration && (
                            <>
                                <View style={styles.spacer}/>
                                <Pressable onPress={onConfiguration} >
                                    <Icon iconType={"configure"} size={32} color={
                                        color == "trip" ? "black" : "white"
                                    }/>
                                </Pressable>
                            </>
                        )}
                    </Row>
                    <HeaderTabs>
                        {children}
                    </HeaderTabs>
                </Column>
            </ColoredBackground>
        </HeaderProvider>
    )
}

Header.Tab = HeaderTab

const styles = StyleSheet.create({
    spacer: {
        flexGrow: 1,
    }
})
