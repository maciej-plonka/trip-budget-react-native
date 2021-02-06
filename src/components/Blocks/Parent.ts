import React from "react";

export type Parent<T = React.ReactNode> = {
    children?: T
}

export type ForcedParent<T = React.ReactNode> = Required<Parent<T>>
