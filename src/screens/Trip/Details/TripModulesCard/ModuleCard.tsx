import {TripModule} from "./TripModule";
import {ColoredBackground, Column, TextWhite} from "../../../../components";
import {useModuleColor} from "../../../../contexts/ThemeContext";
import React, {useMemo} from "react";
import {Icons} from "../../../../icons";


type Props = {
    tripModule: TripModule
    size: number,
}

const moduleStyle = (size: number) => ({
    borderRadius: 4,
    width: size,
    height: size
})
export const ModuleCard = ({tripModule, size}: Props) => {
    const color = useModuleColor(tripModule)
    const style = useMemo(() => moduleStyle(size), [size])
    const iconComponent = useMemo(() => moduleIcon(tripModule), [tripModule])
    return (
        <ColoredBackground color={color} style={style}>
            <Column alignItems={"center"} justifyContent={"center"} style={{height: "100%"}}>
                {iconComponent}
                <TextWhite>{tripModule}</TextWhite>
            </Column>
        </ColoredBackground>
    )
}

const moduleIcon = (tripModule: TripModule) => {
    switch (tripModule) {
        case "budget":
            return (<Icons.Coins fill="white" width={36} height={36}/>)
        case "wish":
            return (<Icons.ShoppingList fill="white" width={36} height={36}/>)
    }
}
