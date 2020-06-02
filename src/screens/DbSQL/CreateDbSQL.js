import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { sqlUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';
import { ScrollView } from 'react-native-gesture-handler';

const CreateDbSQL = props => {
	const [instance, setInstance] = useState('');
	const [ram, setRam] = useState('');
	const [cpuCores, setCpuCores] = useState('');
	const [baskupSize, setBaskupSize] = useState('');
	const [averageHoursPerDay, setAverageHoursPerDay] = useState('');
	const [averageDaysPerWeek, setAverageDaysPerWeek] = useState('');
	const [sqlServerType, setSQLServerType] = useState('');
	const [cloudProvider, setCloudProvider] = useState('');
	const [price, setPrice] = useState('');

	const [message, setMessage] = useState(null);

	const createCloudSQL = async () => {
		Keyboard.dismiss();

		const response = await fetch(`${sqlUrl}/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				instance,
				ram,
				cpuCores,
				baskupSize,
				averageHoursPerDay,
				averageDaysPerWeek,
				sqlServerType,
				cloudProvider,
				price,
			}),
		});

		if (response.ok) {
			const dataJson = await response.json();
			setMessage(dataJson.message);

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
	};

	let msg = null;
	if (message) {
		msg = <Text>{message}</Text>;
	}

	return (
		<ScrollView>
			<View style={styles.screen}>
				<Image
					style={{ height: '100%', width: '100%', position: 'absolute' }}
					source={{
						uri:
							'https://www.amaze.com.au/wp-content/uploads/2017/08/xiStock-490487412-2000x1328.jpg.pagespeed.ic.Y2hn-HvMDU.jpg',
					}}
				/>
				{msg}
				<View style={{ width: '70%' }}>
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
						placeholder="RAM"
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
						items={[
							{ label: 'Standard2017', value: '0' },
							{ label: 'Enterprise2017', value: '1' },
							{ label: 'Express2017', value: '2' },
							{ label: 'Web2017', value: '3' },
						]}
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
						title="Create SQL"
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

export default CreateDbSQL;
