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

//Functions
import GetAllFunctions from '../screens/Function/GetAllFunction';
import FindFunctionById from '../screens/Function/FindFunctionById';
import CreateFunction from '../screens/Function/CreateFunction';
import UpdateFunction from '../screens/Function/UpdateFunction';

//Storages
import GetAllStorage from '../screens/Storage/GetAllStorage';
import FindStorageById from '../screens/Storage/FindStorageById';
import CreateStorage from '../screens/Storage/CreateStorage';
import UpdateStorage from '../screens/Storage/UpdateStorage';

//DbSQL
import GetAllDbSQL from '../screens/DbSQL/GetAllDbSQL';
import FindDbSQLById from '../screens/DbSQL/FindDbSQLById';
import CreateDbSQL from '../screens/DbSQL/CreateDbSQL';
import UpdateDbSQL from '../screens/DbSQL/UpdateDbSQL';

//VM
import GetAllVM from '../screens/VM/GetAllVM';
import FindVMById from '../screens/VM/FindVMById';
import CreateVM from '../screens/VM/CreateVM';
import UpdateVM from '../screens/VM/UpdateVM';

import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const CloudFunctionNavigator = createStackNavigator(
	{
		Function: FunctionScreen,
		GetAll: GetAllFunctions,
		FindById: FindFunctionById,
		Create: CreateFunction,
		Update: UpdateFunction,
	},
	{
		headerMode: 'none',
	}
);

const CloudStorageNavigator = createStackNavigator(
	{
		Storage: StorageScreen,
		GetAll: GetAllStorage,
		FindById: FindStorageById,
		Create: CreateStorage,
		Update: UpdateStorage,
	},
	{
		headerMode: 'none',
	}
);

const CloudDbSQLNavigator = createStackNavigator(
	{
		SQL: SqlScreen,
		GetAll: GetAllDbSQL,
		FindById: FindDbSQLById,
		Create: CreateDbSQL,
		Update: UpdateDbSQL,
	},
	{
		headerMode: 'none',
	}
);

const CloudVMNavigator = createStackNavigator(
	{
		VM: VMScreen,
		GetAll: GetAllVM,
		FindById: FindVMById,
		Create: CreateVM,
		Update: UpdateVM,
	},
	{
		headerMode: 'none',
	}
);

const CategoriesNavigator = createStackNavigator({
	Categories: CategoriesScreen,
	Function: CloudFunctionNavigator,
	VM: CloudVMNavigator,
	SQL: CloudDbSQLNavigator,
	Storage: CloudStorageNavigator,
});

const LoginSignupNavigator = createStackNavigator({
	Login: LoginScreen,
	Register: RegisterScreen,
});

const TabNavigator = createBottomTabNavigator(
	{
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
	},
	{
		tabBarOptions: {
			activeTintColor: colors.accentColor,
		},
	}
);

export default createAppContainer(TabNavigator);
