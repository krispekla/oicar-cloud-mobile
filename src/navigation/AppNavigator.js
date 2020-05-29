import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import FunctionScreen from '../screens/FunctionScreen';
import VMScreen from '../screens/VMScreen';
import SqlScreen from '../screens/SqlScreen';
import StorageScreen from '../screens/StorageScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import { colors } from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';

const CategoriesNavigator = createStackNavigator({
	Categories: CategoriesScreen,
	Function: FunctionScreen,
	VM: VMScreen,
	SQL: SqlScreen,
	Storage: StorageScreen,
});

const LoginSignupNavigator = createStackNavigator({
	Login: LoginScreen,
	Register: RegisterScreen,
});

const TabNavigator = createBottomTabNavigator(
	{
		Categories: {
			screen: CategoriesNavigator,
			navigationOptions: {
				tabBarIcon: tabInfo => {
					return (
						<Ionicons name="ios-cloud" size={24} color={tabInfo.tintColor} />
					);
				},
			},
		},
		LoginSignup: {
			screen: LoginSignupNavigator,
			navigationOptions: {
				tabBarLabel: 'Login',
				tabBarIcon: tabInfo => {
					return (
						<Ionicons name="ios-lock" size={24} color={tabInfo.tintColor} />
					);
				},
			},
		},
	},
	{
		tabBarOptions: {
			activeTintColor: colors.accentColor,
		},
	}
);

export default createAppContainer(TabNavigator);
