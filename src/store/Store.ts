import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist'
import {rootReducer} from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}
const persistedReducer = persistReducer( persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
// @ts-ignore
export const persistor = persistStore(store)
