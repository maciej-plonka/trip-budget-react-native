import "react-native-gesture-handler";
import React from 'react';
import Theme from "./src/contexts/ThemeContext";
import {NavigationContainer} from "@react-navigation/native";
import TripNavigationStack from "./src/pages/Trip";

export default function App() {
    return <Theme>
        <NavigationContainer>
            <TripNavigationStack />
        </NavigationContainer>
    </Theme>
}

