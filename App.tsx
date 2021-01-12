import "react-native-gesture-handler";
import React from 'react';
import Theme from "./src/contexts/ThemeContext";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {persistor, store} from "./src/store";
import {PersistGate} from "redux-persist/integration/react";
import {enableScreens} from "react-native-screens"
import {RootNavigationScreens} from "./src/navigation";

enableScreens();

export default function App() {
    return (
        <Theme>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <NavigationContainer>
                      <RootNavigationScreens/>
                    </NavigationContainer>
                </PersistGate>

            </Provider>
        </Theme>
    )
}

