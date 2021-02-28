import {FormikProps} from "formik/dist/types";

type FormikEnhanced<T> = {
    setValueToValidate(name: string): <V>(value: V) => void
    error(name: keyof T): string | undefined
    hasErrors(): boolean
}

export function enhanceFormik<T>(props: FormikProps<T>): FormikEnhanced<T> {
    const setValueToValidate = (keyName: string) => function <T>(value: T) {
        props.setFieldValue(keyName, value, true)
        setTimeout(() => props.setFieldTouched(keyName, true));
    }
    const error = (keyName: keyof T): string | undefined => {
        if (!props.errors.hasOwnProperty(keyName) || !props.touched[keyName]) return;
        if(typeof  props.errors[keyName] !== 'string'){
            // @ts-ignore
            return Object.values(props.errors[keyName])
                .filter(it => !!it)
                .join("\n")
        }
        return props.errors[keyName] as string
    }
    const hasErrors = () => {
        return Object.keys(props.errors)
            .map(it => it as keyof T)
            .some(it => !!error(it))
    }
    return {  setValueToValidate, error, hasErrors }
}
