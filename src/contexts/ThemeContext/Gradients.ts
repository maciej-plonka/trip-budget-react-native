import {Gradient} from "../../models";

type Gradients = {
    green: Gradient,
    purple: Gradient,
    purpleReversed: Gradient,
    orange: Gradient,
    red: Gradient
}
export const gradients: Gradients = {
    green: {
        colors: ["#52E07A", "#4AC9AA"],
        start: [0, 0.5],
        end: [0.5, 0]
    },
    purple: {
        colors: ["#7F7DF2", "#C772EF"],
        start: [0, 0.5],
        end: [0.5, 0]
    },
    purpleReversed: {
        colors: ["#C772EF", "#7F7DF2"],
        start: [0, 0.5],
        end: [0.5, 0]
    },
    orange: {
        colors: ["#EF7297", "#FCC87B"],
        start: [0, 0.5],
        end: [0.5, 0]
    },
    red: {
        colors: ["#D04545", "#EF7297"],
        start: [0, 0.5],
        end: [0.5, 0]
    },
}
