import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseUrl } from '../constants/api';
import { colors } from '../constants/colors';
import { SQL_SERVER_TYPE } from '../constants/enum';

import { ButtonGroup } from 'react-native-elements';

import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';
import ModalDropdown from 'react-native-modal-dropdown';

const SqlScreen = () => {
	const [instance, setInstance] = useState();
	const [ram, setRam] = useState();
	const [cpuCores, setCpuCores] = useState();
	const [backupSize, setBackupSize] = useState();
	const [averageHoursPerDay, setAverageHoursPerDay] = useState();
	const [averageDaysPerWeek, setAverageDaysPerWeek] = useState();
	const [sqlServerType, setSqlServerType] = useState();
	const [calculateResult, setCalculateResult] = useState();

	const handlePress = async () => {
		if (
			ram === null ||
			cpuCores === null ||
			backupSize === null ||
			averageHoursPerDay === null ||
			averageDaysPerWeek === null ||
			sqlServerType === null
		) {
			alert('Populate all fields');
			return;
		}

		try {
			const data = new FormData();
			data.append('file', {
				ram: ram,
				cpuCores: cpuCores,
				backupSize: backupSize,
				averageHoursPerDay: averageHoursPerDay,
				averageDaysPerWeek: averageDaysPerWeek,
				sqlServerType: sqlServerType,
			});

			const response = await fetch(`${baseUrl}/calculator/dbSQL`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: data,
			});

			if (!response.ok) {
				alert('Something went wrong!');
				return;
			}
			const responseJson = await response.json();

			setCalculateResult(responseJson);
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

				<ModalDropdown
					options={[
						SQL_SERVER_TYPE.standard,
						SQL_SERVER_TYPE.enterprise,
						SQL_SERVER_TYPE.express,
						SQL_SERVER_TYPE.web,
					]}
					onSelect={item => setSqlServerType(item)}
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
	dropdown: {
		height: 40,
		width: '80%',
		zIndex: 10,
	},
});

export default SqlScreen;
