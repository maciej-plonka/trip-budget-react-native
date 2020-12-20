import {useCallback, useEffect, useState} from "react";
import {useAsyncStorage} from "@react-native-async-storage/async-storage"

type Consumer<T> = (t: T) => void
type SetStateParam<T> = T | Consumer<T>

type Result<T> = [Readonly<T>, (value: SetStateParam<T>) => Promise<void>]

export type Serializer<T> = {
    toJson(value: T): string,
    fromJson(json:string): T
}


export const useAsyncStorageState = <T>(key: string, initialValue: T, serializer:Serializer<T>): Result<T> => {
    const [state, setState] = useState<T>(initialValue)
    const {getItem, setItem} = useAsyncStorage(key)
    useEffect(() => {
        getItem()
            .then(json => json && serializer.fromJson(json))
            .then(item => item && setState(item))
            .catch(error => console.error(error));
    }, [initialValue]);

    const updateState = useCallback(async (newState: SetStateParam<T>) => {
        // @ts-ignore
        const value = typeof newState === 'function' ? newState(state) : state
        try {
            value && await setItem(serializer.toJson(value))
            value && setState(value)
        } catch (e) {
            console.error(e);
        }
    }, [state]);

    return [state, updateState];
}

