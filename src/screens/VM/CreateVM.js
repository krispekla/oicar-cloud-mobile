import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { vmUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';
import { ScrollView } from 'react-native-gesture-handler';

const CreateVM = props => {
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

	const createCloudSQL = async () => {
		Keyboard.dismiss();

		const response = await fetch(`${vmUrl}/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				instanceNb,
				operatingSystem,
				core,
				ram,
				storage,
				storageType,
				averageHoursPerDay,
				averageDaysPerWeek,
				cloudProvider,
				price,
			}),
		});

		if (response.ok) {
			const dataJson = await response.json();
			setMessage(dataJson.message);

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
	};

	let msg = null;
	if (message) {
		msg = <Text>{message}</Text>;
	}

	return (
		<ScrollView>
			<View style={styles.screen}>
				{msg}
				<View style={{ width: '70%' }}>
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
						items={[
							{ label: 'Windows', value: '0' },
							{ label: 'Linux', value: '1' },
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
						items={[
							{ label: 'HDD', value: '0' },
							{ label: 'SSD', value: '1' },
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
						setCloud={setCloudProvider}
						items={[
							{ label: 'AWS', value: '0' },
							{ label: 'AZURE', value: '1' },
							{ label: 'GCLOUD', value: '2' },
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
						title="Create VM"
						buttonStyle={styles.button}
						onPress={createCloudSQL}
					/>
				</View>
			</View>
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

export default CreateVM;
