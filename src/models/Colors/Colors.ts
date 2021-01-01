export type Color = string | Gradient
export type GradientPosition = [number, number]
export type GradientColor = [string, string]

export const isGradient = (color: Color): color is Gradient => typeof color !== 'string'

export type Gradient = {
    colors: GradientColor
    start: GradientPosition
    end: GradientPosition
}
