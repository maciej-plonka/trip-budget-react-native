import * as React from "react"
import Svg, {Rect, SvgProps} from "react-native-svg";

export function IconList(props: SvgProps) {
    return (
        <Svg viewBox="0 0 16 16" {...props}>
            <Rect width={16} height={3} rx={1.5} fill={props.color}/>
            <Rect y={6} width={16} height={3} rx={1.5} fill={props.color}/>
            <Rect y={12} width={16} height={3} rx={1.5} fill={props.color}/>
        </Svg>
    )
}

