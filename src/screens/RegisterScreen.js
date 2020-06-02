import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import CustomButton from '../components/CustomButton/CustomButton';
import FormInput from '../components/FormInput/FormInput';
import { userUrl } from '../utils/api';

const RegisterScreen = props => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const register = async () => {
		if (!firstName || !lastName || !email || !password) {
			alert('Please fill all fields');
			return;
		}

		const response = await fetch(`${userUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json-patch+json',
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password,
			}),
		});

		if (response.ok) {
			const data = await response.json();

			props.navigation.navigate({ routeName: 'Login' });
		} else {
			alert(response.statusText);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.logo}>Cloud Calculator</Text>
			<FormInput placeholder="First Name . . ." change={setFirstName} />
			<FormInput placeholder="Last Name . . ." change={setLastName} />
			<FormInput placeholder="Email . . ." change={setEmail} />
			<FormInput secureTextEntry placeholder="Password" change={setPassword} />

			<TouchableOpacity style={styles.loginBtn} onPress={register}>
				<CustomButton press={register} text="Register" />
			</TouchableOpacity>
			<TouchableOpacity>
				<Text
					style={styles.loginText}
					onPress={() => {
						props.navigation.navigate({ routeName: 'Login' });
					}}
				>
					Already Have Account? Login
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
	inputView: {
		width: '80%',
		backgroundColor: colors.blue,
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20,
	},
	inputText: {
		height: 50,
		color: colors.white,
	},
	forgot: {
		color: colors.white,
		fontSize: 11,
	},
	loginBtn: {
		width: '80%',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	loginText: {
		color: colors.white,
		marginTop: 5,
	},
});

export default RegisterScreen;
