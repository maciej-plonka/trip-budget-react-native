import {useCallback, useState} from "react";
import {LayoutChangeEvent} from "react-native";

export const useElementDimensions = () => {
    const [dimensions, setDimensions] = useState<Dimensions | undefined>()
    const onLayout = useCallback((event: LayoutChangeEvent) => setDimensions(event.nativeEvent.layout), [])
    return {dimensions, onLayout}
}
type Dimensions = {
    width: number,
    height: number,
}
