import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		if (!email || !password) {
			alert('E-mail and password are required');
		} else {
			const config = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};

			try {
				const response = await fetch(
					'http://10.0.2.2:8014/api/user/login',
					config
				);

				if (response.ok) {
					const data = await response.json();

					data.userId !== undefined
						? props.navigation.navigate({ routeName: 'Calculator' })
						: alert('Login failed');
				} else {
					alert(response.statusText);
				}
			} catch (err) {
				alert(err);
			}
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
		backgroundColor: '#003f5c',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		fontWeight: 'bold',
		fontSize: 50,
		color: '#fb5b5a',
		marginBottom: 40,
	},
	forgot: {
		color: 'white',
		fontSize: 11,
	},
	loginText: {
		color: 'white',
	},
});

export default Login;
