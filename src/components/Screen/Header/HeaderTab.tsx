import React, {FC} from "react";
import {Text} from "react-native";
export type HeaderTabProps = {
    title: string
}
export const HeaderTab :FC<HeaderTabProps> = ({title}) => {
    return (
        <Text>{title}</Text>
    )
}
