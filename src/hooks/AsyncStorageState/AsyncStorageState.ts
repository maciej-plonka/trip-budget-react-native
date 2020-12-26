import {useCallback, useEffect, useState} from "react";
import {useAsyncStorage} from "@react-native-async-storage/async-storage"
import {Serializer} from "../Serializer";

type StateUpdater<T> = (previous: Readonly<T>) => T

type Result<T> = [Readonly<T>, (value: StateUpdater<T>) => Promise<void>]

export const useAsyncStorageState = <T>(key: string, initialValue: T, serializer: Serializer<T>): Result<T> => {
    const [state, setState] = useState<T>(initialValue)
    const {getItem, setItem} = useAsyncStorage(key)
    useEffect(() => {
        getItem()
            .then(json => json && serializer.fromJson(json))
            .then(item => item && setState(item))
            .catch(error => console.error(error));
    }, []);

    const updateState = useCallback(async (stateConsumer: StateUpdater<T>) => {
        const value = stateConsumer(state)
        try {
            await setItem(serializer.toJson(value))
            setState(value)
        } catch (e) {
            console.error(e);
        }
    }, [state]);

    return [state, updateState];
}

