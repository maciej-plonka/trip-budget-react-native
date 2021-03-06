import {Trip} from "../../../../store/models";
import {Card, Column, Row} from "../../../../components";
import React, {useMemo} from "react";
import {allModules, TripModule} from "./TripModule";
import {useElementDimensions} from "../../../../hooks";
import {ModuleCard} from "./ModuleCard";
import {TouchableOpacity} from "react-native";

type Props = {
    trip: Trip
    onModuleSelected: (tripModule: TripModule) => void
}

const offset = 8
const calculateSingleModuleWidth = (totalWidth: number, numberPerRow = 3) => {
    if (totalWidth <= offset) return 0;
    return Math.floor(totalWidth / numberPerRow - (offset * numberPerRow) / 2)
}

const modulesGrouped = (() => {
    const rows = [];
    let row: TripModule[] = [];
    for (let index = 0; index < allModules.length; index++) {
        row = [...row, allModules[index]]
        if (row.length === 3) {
            rows.push([...row])
            row = [];
        }
    }
    return row.length > 0 ? [...rows, row] : rows
})()

export const TripModulesCard = ({trip, onModuleSelected}: Props) => {
    const {onLayout, dimensions} = useElementDimensions();
    const width = useMemo(() => calculateSingleModuleWidth(dimensions?.width ?? 0), [dimensions])
    return (
        <Card paddingVertical={8} paddingHorizontal={16}>
            <Column onLayout={onLayout}>
                {dimensions && modulesGrouped.map((row, rowIndex) => (
                    <Row key={rowIndex} justifyContent={"space-between"} marginVertical={offset}>
                        {row.map((module, index) => (
                            <TouchableOpacity key={index} onPress={() => onModuleSelected(module)}>
                                <ModuleCard tripModule={module} size={width} />
                            </TouchableOpacity>
                        ))}
                    </Row>
                ))}
            </Column>
        </Card>
    )
}
