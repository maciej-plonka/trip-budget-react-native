import React from "react";
import {Row} from "./Row";
import {Column} from "./Column";
import {BlockProps} from "./Block";

type Props = BlockProps & {
    direction: "horizontal" | "vertical" ,
}
export const Box = ({direction, children, ...props}: Props) => {
    switch (direction) {
        case "horizontal":
            return (
                <Row {...props}>
                    {children}
                </Row>
            )
        case "vertical":
            return (
                <Column {...props}>
                    {children}
                </Column>
            )
    }
}
