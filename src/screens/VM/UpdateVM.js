import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { vmUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';

const UpdateVM = props => {
	const [id, setId] = useState('');
	const [cloudVM, setCloudVM] = useState(null);

	const [instanceNb, setInstanceNb] = useState('');
	const [operatingSystem, setOperatingSystem] = useState('');
	const [core, setCore] = useState('');
	const [ram, setRam] = useState('');
	const [storage, setStorage] = useState('');
	const [storageType, setStorageType] = useState('');
	const [averageHoursPerDay, setAverageHoursPerDay] = useState('');
	const [averageDaysPerWeek, setAverageDaysPerWeek] = useState('');
	const [cloudProvider, setCloudProvider] = useState('');
	const [price, setPrice] = useState('');

	const [message, setMessage] = useState(null);

	const getVMById = async () => {
		if (!checkInteger.test(id)) return;

		Keyboard.dismiss();

		try {
			const response = await fetch(`${vmUrl}?id=${id}`, {
				method: 'GET',
				headers: {
					accept: 'text/plain',
				},
			});

			const data = await response.json();

			setInstanceNb(data.instanceNb);
			setOperatingSystem(data.operatingSystem);
			setCore(data.core);
			setRam(data.ram);
			setStorage(data.storage);
			setStorageType(data.storageType);
			setAverageHoursPerDay(data.averageHoursPerDay);
			setAverageDaysPerWeek(data.averageDaysPerWeek);
			setPrice(data.price);
			setCloudProvider(data.cloudProvider);

			setCloudVM(data);
		} catch (err) {
			console.log(err);
		}
	};

	const updateVMHandler = async () => {
		const existingVM = { ...cloudVM };

		existingVM['instanceNb'] = Number.parseInt(instanceNb);
		existingVM['operatingSystem'] = Number.parseInt(operatingSystem);
		existingVM['core'] = Number.parseFloat(core);
		existingVM['ram'] = Number.parseInt(ram);
		existingVM['storage'] = Number.parseInt(storage);
		existingVM['storageType'] = Number.parseInt(storageType);
		existingVM['averageHoursPerDay'] = Number.parseFloat(averageHoursPerDay);
		existingVM['averageDaysPerWeek'] = Number.parseInt(averageDaysPerWeek);
		existingVM['cloudProvider'] = Number.parseInt(cloudProvider);
		existingVM['price'] = Number.parseFloat(price);

		try {
			const response = await fetch(`${vmUrl}/update`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(existingVM),
			});

			if (response.ok) {
				const resJson = await response.json();
				alert('VM updated');

				setInstanceNb('');
				setOperatingSystem('');
				setCore('');
				setRam('');
				setStorage('');
				setStorageType('');
				setAverageHoursPerDay('');
				setAverageDaysPerWeek('');
				setCloudProvider('');
				setPrice('');
			}
		} catch (error) {
			console.log(error);
		}
	};

	let data = null;
	if (cloudVM) {
		data = (
			<ScrollView>
				<Card title="Update Cloud VM" containerStyle={{ width: '80%' }}>
					<Input
						placeholder="Number of Instance"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={instanceNb.toString()}
						onChangeText={value => setInstanceNb(value)}
					/>

					<Dropdown
						setCloud={setOperatingSystem}
						selected={operatingSystem}
						items={[
							{ label: 'Windows', value: 0 },
							{ label: 'Linux', value: 1 },
						]}
					/>

					<Input
						placeholder="Core"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={core.toString()}
						onChangeText={value => setCore(value)}
					/>

					<Input
						placeholder="Ram"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={ram.toString()}
						onChangeText={value => setRam(value)}
					/>

					<Input
						placeholder="Storage"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={storage.toString()}
						onChangeText={value => setStorage(value)}
					/>

					<Dropdown
						setCloud={setStorageType}
						selected={storageType}
						items={[
							{ label: 'HDD', value: 0 },
							{ label: 'SSD', value: 1 },
						]}
					/>

					<Input
						placeholder="Average Hours Per Day"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={averageHoursPerDay.toString()}
						onChangeText={value => setAverageHoursPerDay(value)}
					/>

					<Input
						placeholder="Average Days Per Week"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={averageDaysPerWeek.toString()}
						onChangeText={value => setAverageDaysPerWeek(value)}
					/>

					<Dropdown
						selected={cloudProvider}
						setCloud={setCloudProvider}
						items={[
							{ label: 'AWS', value: 0 },
							{ label: 'AZURE', value: 1 },
							{ label: 'GCLOUD', value: 2 },
						]}
					/>

					<Input
						placeholder="Price"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={price.toString()}
						onChangeText={value => setPrice(value)}
					/>

					<Button
						title="Update VM"
						buttonStyle={styles.button}
						onPress={updateVMHandler}
					/>
				</Card>
			</ScrollView>
		);
	}

	console.log('OS', operatingSystem);
	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<View style={{ width: '70%' }}>
				<Input
					placeholder="Insert id of cloud vm"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={id}
					onChangeText={value => setId(value)}
				/>

				<Button
					title="Find Cloud VM"
					buttonStyle={styles.button}
					onPress={getVMById}
				/>
			</View>
			{data}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	input: {
		backgroundColor: colors.primaryColor,
		padding: 8,
		color: colors.orange,
	},
	label: {
		color: colors.accentColor,
		fontSize: 22,
	},
	button: {
		backgroundColor: colors.primaryColor,
		width: '70%',
		alignSelf: 'center',
	},
	cardText: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingTop: 5,
	},
});

export default UpdateVM;
