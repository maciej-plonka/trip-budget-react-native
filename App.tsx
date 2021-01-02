import "react-native-gesture-handler";
import React from 'react';
import Theme from "./src/contexts/ThemeContext";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {persistor, store} from "./src/store";
import {PersistGate} from "redux-persist/integration/react";
import {enableScreens} from "react-native-screens"
import {RootNavigationStack} from "./src/pages";

enableScreens();


export default function App() {
    return (
        <Theme>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <NavigationContainer>
                      <RootNavigationStack/>
                    </NavigationContainer>
                </PersistGate>

            </Provider>
        </Theme>
    )
}

