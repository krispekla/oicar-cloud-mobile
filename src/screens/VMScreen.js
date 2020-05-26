import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseUrl } from '../constants/api';
import { colors } from '../constants/colors';
import { OPERATING_SYSTEM, STORAGE_TYPE } from '../constants/enum';

import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';
import ModalDropdown from 'react-native-modal-dropdown';

const VMScreen = () => {
	const [operatingSystem, setOperatingSystem] = useState();
	const [cpuCore, setCpuCore] = useState();
	const [ram, setRam] = useState();
	const [storageType, setStorageType] = useState();
	const [averageHoursPerDay, setAverageHoursPerDay] = useState();
	const [averageDaysPerWeek, setAverageDaysPerWeek] = useState();
	const [calculateResult, setCalculateResult] = useState();

	const handlePress = async () => {
		if (
			operatingSystem === null ||
			cpuCore === null ||
			ram === null ||
			storageType === null ||
			averageHoursPerDay === null ||
			averageDaysPerWeek === null
		) {
			alert('Populate all fields');
			return;
		}

		try {
			const data = new FormData();
			data.append('file', {
				operatingSystem: operatingSystem,
				cpuCore: cpuCore,
				ram: ram,
				storageType: storageType,
				averageHoursPerDay: averageHoursPerDay,
				averageDaysPerWeek: averageDaysPerWeek,
			});

			const response = await fetch(`${baseUrl}/catlculator/vm`, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
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
				<ModalDropdown
					options={[OPERATING_SYSTEM.windows, OPERATING_SYSTEM.linux]}
					onSelect={item => setOperatingSystem(item)}
					defaultValue="Operating System"
				/>

				<FormInput
					placeholder="Ram"
					value={ram}
					change={setRam}
					keyboardType="number-pad"
				/>

				<FormInput
					placeholder="CPU Cores"
					value={cpuCore}
					change={setCpuCore}
					keyboardType="number-pad"
				/>

				<ModalDropdown
					options={[STORAGE_TYPE.hdd, STORAGE_TYPE.ssd]}
					onSelect={item => setStorageType(item)}
					defaultValue="Storage Type"
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
	modal: {
		height: 40,
		backgroundColor: colors.orange,
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 30,
		borderRadius: 9,
		color: colors.blue,
	},
});

export default VMScreen;
