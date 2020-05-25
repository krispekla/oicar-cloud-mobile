import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseUrl } from '../constants/api';
import { colors } from '../constants/colors';

import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';

const StorageScreen = () => {
	const [totalAmount, setTotalAmount] = useState(null);
	const [readPerMonth, setReadPerMonth] = useState(null);
	const [writePerMonth, setWritePerMonth] = useState(null);

	const handlePress = async () => {};

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Compare Function Prices</Text>
			<View style={styles.container}>
				<FormInput
					placeholder="Total Amount"
					value={totalAmount}
					change={setTotalAmount}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Read Operations Per Month"
					value={readPerMonth}
					change={setReadPerMonth}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Executions/month"
					value={writePerMonth}
					change={setWritePerMonth}
					keyboardType="number-pad"
				/>

				<CustomButton text="Run Calculation" press={handlePress} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.blue,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: colors.white,
		fontSize: 28,
		textAlign: 'center',
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		margin: '20%',
	},
});

export default StorageScreen;
