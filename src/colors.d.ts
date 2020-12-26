type Color = string | Gradient
type GradientPosition = [number, number]
type GradientColor = [string, string]

interface Gradient {
    colors: GradientColor
    start: GradientPosition
    end: GradientPosition
}
