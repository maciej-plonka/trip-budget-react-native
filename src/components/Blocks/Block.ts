import {Styled} from "./Styled";
import {ForcedParent, Parent} from "./Parent";
import {StyleProp, ViewStyle} from "react-native";

export type BlockProps<S extends Styled = Styled, P extends Parent | ForcedParent = Parent> = S & P & {
    flex?: number

    padding?: number,
    paddingVertical?: number,
    paddingHorizontal?: number,

    margin?: number,
    marginVertical?: number,
    marginHorizontal?: number,

    alignItems?: "center" |"flex-end" | "flex-start" | "stretch" | "baseline"
    justifyContent?: "flex-start" | "flex-end" | "center" |"space-between" | "space-around" | "space-evenly"
}

export const useBlockStyles = (props: Omit<BlockProps, "children">):StyleProp<ViewStyle>[] => {
    return [
        props.style,
        props.flex != undefined && {flex: props.flex},
        props.padding != undefined && {padding: props.padding},
        props.paddingVertical != undefined && {paddingVertical: props.paddingVertical},
        props.paddingHorizontal != undefined && {paddingHorizontal: props.paddingHorizontal},
        props.margin != undefined && {margin: props.margin},
        props.marginVertical != undefined && {marginVertical: props.marginVertical},
        props.marginHorizontal != undefined && {marginHorizontal: props.marginHorizontal},
        props.alignItems != undefined && {alignItems: props.alignItems},
        props.justifyContent != undefined && {justifyContent: props.justifyContent}
    ]
}
