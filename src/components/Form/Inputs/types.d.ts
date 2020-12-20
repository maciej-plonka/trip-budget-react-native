type IconName = "name" | "calendar" | "money"

type InputValueType = Date | string | number

type BaseInputProps<T extends InputValueType> = {
    label: string,
    icon?: IconName,
    value: T,
    onChanged: (value: T) => void
}
