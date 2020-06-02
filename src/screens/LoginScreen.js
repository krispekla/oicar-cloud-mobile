import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { userUrl } from '../utils/api';
import * as SecureStore from 'expo-secure-store';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		if (!email || !password) {
			alert('E-mail and password are required');
			return;
		}

		try {
			const response = await fetch(`${userUrl}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json-patch+json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();
			SecureStore.setItemAsync('token', data.token);

			data.token !== undefined
				? props.navigation.navigate({ routeName: 'Categories' })
				: alert('Login failed');
		} catch (err) {
			alert(err);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.logo}>Cloud Calculator</Text>

			<FormInput placeholder="Email . . ." change={setEmail} />

			<FormInput secureTextEntry placeholder="Password" change={setPassword} />

			<CustomButton press={login} text="LOGIN" />

			<TouchableOpacity>
				<Text
					style={styles.loginText}
					onPress={() => {
						props.navigation.navigate({ routeName: 'Register' });
					}}
				>
					SignUp
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.lightBlue,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		fontWeight: 'bold',
		fontSize: 50,
		color: colors.white,
		marginBottom: 40,
	},
	forgot: {
		color: colors.white,
		fontSize: 11,
	},
	loginText: {
		color: colors.white,
	},
});

export default Login;
