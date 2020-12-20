import React from "react";
import {MaterialCommunityIcons, FontAwesome5} from "@expo/vector-icons";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

type Props = {
    icon: IconName,
    styles?: StyleProp<ViewStyle>
}
const InputIcon = ({icon, styles}:Props) => {
    const style = [iconStyle.icon, styles]
    switch(icon) {
        case "name":
            return <MaterialCommunityIcons style={style} name="notebook-outline" size={20}  />
        case "calendar":
            return <MaterialCommunityIcons style={style} name="calendar" size={20} />
        case "money":
            return <FontAwesome5  style={style} name="money-bill" size={16} />
    }
    return <View/>
}


const iconStyle = StyleSheet.create({
    icon: {
        color: '#D04545',
    },
});
export default InputIcon;
