import 'react-native-gesture-handler';
// In App.js in a new project
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import AppNavigator from './src/navigation/AppNavigator';

function App() {
	return <AppNavigator />;
}

export default App;
