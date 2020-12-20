import React from "react";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Tab, useTabContext, useTabDispatchContext} from "../../../contexts/TabContext";

interface HeaderTabsProps {
    color: string
}

const HeaderTabs = ({color}: HeaderTabsProps) => {
    const {tabs, selected} = useTabContext();
    const dispatch = useTabDispatchContext()
    const selectTab = (tab: Tab) => dispatch({type: "select", tab})
    if(!tabs || !tabs.length)
        return null;
    return (
        <View style={styles.container}>
            {tabs.map(tab => (
                <TouchableOpacity key={tab.id}
                                  onPress={() => selectTab(tab)}
                                  style={[styles.tab, tab === selected && {borderBottomColor: color}]}>
                    <Text style={[styles.tabText, tab === selected && {color}]}>{tab.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 24,
        flexDirection: "row"
    },
    tab: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        borderBottomColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 1,
    },
    tabText: {
        color: "rgba(0,0,0,0.3)",
        width: "100%",
        textAlign:"center"

    }
})

export default HeaderTabs
