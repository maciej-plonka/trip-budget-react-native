import React from "react";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
type Props = {
    icon: ButtonIcon
}
const FormButtonIcon = ({icon}: Props) => {
    switch(icon){
        case "cart":
            return <MaterialCommunityIcons name="cart-outline" size={16} color="white" />
        case "confirm":
            return <MaterialIcons name="check" size={16} color="white" />
        case "delete":
            return <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
    }
}

export default FormButtonIcon;
