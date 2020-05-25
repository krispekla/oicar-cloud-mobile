import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseUrl } from '../constants/api';
import { colors } from '../constants/colors';
import { SQL_SERVER_TYPE } from '../constants/enum';

import { ButtonGroup } from 'react-native-elements';

import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';

const SqlScreen = () => {
	const [instance, setInstance] = useState();
	const [ram, setRam] = useState();
	const [cpuCores, setCpuCores] = useState();
	const [backupSize, setBackupSize] = useState();
	const [averageHoursPerDay, setAverageHoursPerDay] = useState();
	const [averageDaysPerWeek, setAverageDaysPerWeek] = useState();
	const [sqlServerType, setSqlServerType] = useState();

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
					placeholder="Instance"
					value={instance}
					change={setInstance}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Ram"
					value={ram}
					change={setRam}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="CPU Cores"
					value={cpuCores}
					change={setCpuCores}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Backup Size"
					value={backupSize}
					change={setBackupSize}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Average Hours Per Day"
					value={averageHoursPerDay}
					change={setAverageHoursPerDay}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="Average Days Per Week"
					value={averageDaysPerWeek}
					change={setAverageDaysPerWeek}
					keyboardType="number-pad"
				/>

				<ButtonGroup
					buttons={SQL_SERVER_TYPE}
					buttonStyle={styles.button}
					selectedIndex={sqlServerType}
					innerBorderStyle={styles.inner}
					onPress={e => setSqlServerType(e)}
					containerStyle={styles.containerButton}
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
	containerButton: {
		margin: 10,
		padding: 5,
		width: '100%',
	},
	button: {
		margin: 5,
	},
});

export default SqlScreen;
