import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Image } from 'react-native';
import CloudFunction from '../../models/CloudFunction';
import { Input, Button, Card } from 'react-native-elements';
import { colors } from '../../constants/colors';
import { checkInteger, checkDoubles } from '../../utils/checkInputValues';
import { functionUrl } from '../../utils/api';
import Dropdown from '../../components/Dropdown/Dropdown';
import { CLOUD_PROVIDER } from '../../constants/enum';

const CreateFunction = props => {
	const [
		executinPerRequestInMiliseconds,
		setExecutinPerRequestInMiliseconds,
	] = useState('');
	const [memorySizeInMB, setMemorySizeInMB] = useState('');
	const [executionsPerMonth, setExecutionsPerMonth] = useState('');
	const [cloudProvider, setCloudProvider] = useState('');
	const [price, setPrice] = useState('');
	const [message, setMessage] = useState(null);

	const createCloudFunction = async () => {
		Keyboard.dismiss();

		if (
			checkInteger.test(executinPerRequestInMiliseconds) &&
			checkInteger.test(memorySizeInMB) &&
			checkDoubles.test(executionsPerMonth) &&
			checkDoubles.test(price)
		) {
			const data = new CloudFunction();

			data.id = null;
			data.executinPerRequestInMiliseconds = Number.parseInt(
				executinPerRequestInMiliseconds
			);
			data.memorySizeInMB = Number.parseInt(memorySizeInMB);
			data.executionsPerMonth = Number.parseFloat(executionsPerMonth);
			data.cloudProvider = Number.parseInt(cloudProvider);
			data.price = Number.parseInt(price);

			const response = await fetch(`${functionUrl}/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					executinPerRequestInMiliseconds,
					memorySizeInMB,
					executionsPerMonth,
					price,
					cloudProvider,
				}),
			});

			if (response.ok) {
				const dataJson = await response.json();
				setMessage(dataJson.message);

				setExecutinPerRequestInMiliseconds('');
				setMemorySizeInMB('');
				setExecutionsPerMonth('');
				setPrice('');
				setCloudProvider('');
			}
		}
	};

	let msg = null;
	if (message) {
		msg = <Text>{message}</Text>;
	}

	return (
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
					placeholder="Executin Per Request In Miliseconds"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={executinPerRequestInMiliseconds.toString()}
					onChangeText={value => setExecutinPerRequestInMiliseconds(value)}
				/>

				<Input
					placeholder="Memory Size In MB"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={memorySizeInMB.toString()}
					onChangeText={value => setMemorySizeInMB(value)}
				/>

				<Input
					placeholder="Executions Per Month"
					keyboardType="number-pad"
					returnKeyType="done"
					inputStyle={styles.input}
					labelStyle={styles.label}
					value={executionsPerMonth.toString()}
					onChangeText={value => setExecutionsPerMonth(value)}
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

				<Dropdown
					selected={cloudProvider.toString()}
					setCloud={setCloudProvider}
					items={[
						{ label: 'AWS', value: '0' },
						{ label: 'AZURE', value: '1' },
						{ label: 'GCLOUD', value: '2' },
					]}
				/>
				<Button
					title="Create Function"
					buttonStyle={styles.button}
					onPress={createCloudFunction}
				/>
			</View>
		</View>
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

export default CreateFunction;
