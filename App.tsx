import "react-native-gesture-handler";
import React from 'react';
import {ThemedApplication} from "./src/contexts/ThemeContext";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {persistor, store} from "./src/store";
import {PersistGate} from "redux-persist/integration/react";
import {enableScreens} from "react-native-screens"
import {RootNavigationScreens} from "./src/navigation";
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context";

enableScreens();

export default function App() {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <ThemedApplication>
                        <NavigationContainer>
                            <RootNavigationScreens/>
                        </NavigationContainer>
                    </ThemedApplication>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    )
}

