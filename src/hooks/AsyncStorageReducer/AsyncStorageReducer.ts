import {Serializer} from "../Serializer";
import {useAsyncStorageState} from "../AsyncStorageState";

export type ReducerState<T> = Readonly<T>
export type Reducer<T,A> = (state: ReducerState<T>, action: A) => ReducerState<T>
export type AsyncDispatch<T> = (value: T) => Promise<void>

export const useAsyncStorageReducer = <T,A>(key: string, reducer: Reducer<T,A>, initialValue: ReducerState<T>, serializer: Serializer<T>): [ReducerState<T>,  AsyncDispatch<A>] => {
    const [value, setValue] = useAsyncStorageState(key, initialValue, serializer);
    return [value, async( action) => await setValue(previous => reducer(previous, action))]
}
