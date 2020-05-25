import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseUrl } from '../constants/api';
import { colors } from '../constants/colors';

import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';

const FunctionScreen = () => {
	const [executinRequest, setExecutinRequest] = useState(null);
	const [memory, setMemory] = useState(null);
	const [executionPerMonth, setExecutionPerMonth] = useState(null);

	const handlePress = async () => {
		try {
			const data = new FormData();

			data.append('file', {
				ExecutinPerRequestInMiliseconds: executinRequest,
				MemorySizeInMB: memory,
				ExecutionsPerMonth: executionPerMonth,
			});

			fetch(`${baseUrl}/calcualtor`, {
				method: 'GET',
			});
		} catch (err) {
			console.log(err);
			console.log('Status ', err.status);
		}
	};

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Compare Function Prices</Text>
			<View style={styles.container}>
				<FormInput
					placeholder="Executin Per Request (ms)"
					value={executinRequest}
					change={setExecutinRequest}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Memory Size (MB)"
					value={memory}
					change={setMemory}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Executions/month"
					value={executionPerMonth}
					change={setExecutionPerMonth}
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

export default FunctionScreen;
