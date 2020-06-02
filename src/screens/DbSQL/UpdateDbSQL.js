import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger } from '../../utils/checkInputValues';
import { sqlUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';

const UpdateDbSQL = props => {
	const [id, setId] = useState('');
	const [cloudSQL, setCloudSQL] = useState(null);

	const [instance, setInstance] = useState();
	const [ram, setRam] = useState();
	const [cpuCores, setCpuCores] = useState();
	const [baskupSize, setBaskupSize] = useState();
	const [averageHoursPerDay, setAverageHoursPerDay] = useState();
	const [averageDaysPerWeek, setAverageDaysPerWeek] = useState();
	const [sqlServerType, setSQLServerType] = useState();
	const [cloudProvider, setCloudProvider] = useState();
	const [price, setPrice] = useState();

	const getStorageById = async () => {
		if (!checkInteger.test(id)) return;

		Keyboard.dismiss();

		try {
			const response = await fetch(`${sqlUrl}?id=${id}`, {
				method: 'GET',
				headers: {
					accept: 'text/plain',
				},
			});

			const data = await response.json();

			setInstance(data.instance);
			setRam(data.ram);
			setCpuCores(data.cpuCores);
			setBaskupSize(data.baskupSize);
			setAverageHoursPerDay(data.averageHoursPerDay);
			setAverageDaysPerWeek(data.averageDaysPerWeek);
			setSQLServerType(data.sqlServerType);
			setPrice(data.price);
			setCloudProvider(data.cloudProvider);

			setCloudSQL(data);
		} catch (err) {
			console.log(err);
		}
	};

	const updateSQLHandler = async () => {
		const existingSQL = { ...cloudSQL };

		existingSQL['instance'] = Number.parseInt(instance);
		existingSQL['ram'] = Number.parseInt(ram);
		existingSQL['cpuCores'] = Number.parseFloat(cpuCores);
		existingSQL['averageHoursPerDay'] = Number.parseFloat(averageHoursPerDay);
		existingSQL['averageDaysPerWeek'] = Number.parseInt(averageDaysPerWeek);
		existingSQL['sqlServerType'] = Number.parseInt(sqlServerType);
		existingSQL['cloudProvider'] = Number.parseInt(cloudProvider);
		existingSQL['price'] = Number.parseFloat(price);

		try {
			const response = await fetch(`${sqlUrl}/update`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(existingSQL),
			});

			if (response.ok) {
				const resJson = await response.json();
				alert('Storage updated');

				setInstance('');
				setRam('');
				setCpuCores('');
				setBaskupSize('');
				setAverageHoursPerDay('');
				setAverageDaysPerWeek('');
				setSQLServerType('');
				setCloudProvider('');
				setPrice('');
			}
		} catch (error) {
			console.log(error);
		}
	};

	let data = null;
	if (cloudSQL) {
		data = (
			<ScrollView>
				<Card
					title="Update Cloud Database SQL"
					containerStyle={{ width: '80%' }}
				>
					<Input
						placeholder="Instance"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={instance.toString()}
						onChangeText={value => setInstance(value)}
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
						placeholder="CPU Cores"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={cpuCores.toString()}
						onChangeText={value => setCpuCores(value)}
					/>

					<Input
						placeholder="Backup Size"
						keyboardType="number-pad"
						returnKeyType="done"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={baskupSize.toString()}
						onChangeText={value => setBaskupSize(value)}
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
						setCloud={setSQLServerType}
						selected={sqlServerType.toString()}
						items={[
							{ label: 'Standard2017', value: '0' },
							{ label: 'Enterprise2017', value: '1' },
							{ label: 'Express2017', value: '2' },
							{ label: 'Web2017', value: '3' },
						]}
					/>
					<Dropdown
						selected={cloudProvider.toString()}
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
						title="Update DB"
						buttonStyle={styles.button}
						onPress={updateSQLHandler}
					/>
				</Card>
			</ScrollView>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<Image
				style={{ height: '100%', width: '100%', position: 'absolute' }}
				source={{
					uri:
						'https://www.amaze.com.au/wp-content/uploads/2017/08/xiStock-490487412-2000x1328.jpg.pagespeed.ic.Y2hn-HvMDU.jpg',
				}}
			/>
			<View style={{ width: '70%' }}>
				<Input
					placeholder="Insert id of cloud sql"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={id}
					onChangeText={value => setId(value)}
				/>

				<Button
					title="Find SQL Database"
					buttonStyle={styles.button}
					onPress={getStorageById}
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

export default UpdateDbSQL;
