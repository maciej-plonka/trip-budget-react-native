import React from "react";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {StyleProp, ViewStyle} from "react-native";

type Props = {
    icon: ButtonIcon,
    style?: StyleProp<ViewStyle>
}
const FormButtonIcon = ({icon, style}: Props) => {
    switch(icon){
        case "cart":
            return <MaterialCommunityIcons style={style} name="cart-outline" size={16} color="white" />
        case "confirm":
            return <MaterialIcons style={style} name="check" size={16} color="white" />
        case "delete":
            return <MaterialCommunityIcons style={style} name="delete-outline" size={19} color="white" />
        case "add":
            return <MaterialCommunityIcons style={style} name={"plus"} size={19} color={"white"}/>
        case "configure":
            return <MaterialIcons style={style} name={"settings"} size={19} color={"white"}/>
    }
}

export default FormButtonIcon;
